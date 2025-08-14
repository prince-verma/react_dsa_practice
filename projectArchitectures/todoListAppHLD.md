great, 
I got gist of HLD and LLD.

Now, Let me try to use this knowledge to build a HLD for a TODO app,.
Post that, we will add more details in the app.
so, Thinking of the future, what I will be doing, I will be creating a scalable HLD design and arch.



so here are the details.
 - TODO app

1. Modules/feature based  bifurcation, define posssible folder staructure
 as simple is the TODO app, so it will require basics modules
 - Auth module
 - Home screen - with  multiple Todo lists cards
 - single TODO list module creation / updation/ deletion

possible folders
 - APP.tsx
 - AppDependencies.ts // inject infra/data layer dependencies in to the use-case
 - fastlane/
     - fastlane/fastlane.rb
     - fastlane/commonUtils.rb
     - fastlane/android.rb
     - fastlane/ios.rb
     - fastlane/appfile.rb
 - src/services
    - src/services/logger // centeralised logging
    - src/services/remoteConfig
      - src/services/remoteConfig/firebase.ts 
    - src/services/analytics
      - src/services/analytics/moe
      - src/services/analytics/branch
      - src/services/analytics/google
      - src/services/analytics/firebase
 - src/navigation
    - src/navigation/utils // defines an abstraction layer to consume navigation ref and use it for navigation flows within app, instead the usage of useNavigation hook
    - src/navigation/.....
 - src/shared
   - src/shared/hooks
   - src/shared/components // ui-kit
   - src/shared/utils
   - src/shared/constants
 - src/store
   - src/store/reduxPersistStore.ts
   - src/store/common
     - src/store/common/commonSlice.ts
     - src/store/common/slectors.ts
 - src/screens
    - src/screens/Auth
      - src/screens/Auth/types
      - src/screens/Auth/login
          - src/screens/Auth/login/__tests__
          - src/screens/Auth/login/loginSlice.tsx // redux-slice with async actions
          - src/screens/Auth/login/view
            - src/screens/Auth/login/view/index.tsx // view
            - src/screens/Auth/login/view/..... // ui related components
          - src/screens/Auth/login/viewModal
            - src/screens/Auth/login/loginDataMapper.ts // mapper files to define data mapping of BE api response with UI layer
            - src/screens/Auth/login/loginUserCases.ts // define use-cased or hooks used in login/index.tsx
          - src/screens/Auth/login/modal // DATA/infra later
            - src/screens/Auth/login/modal/service.ts
      - src/screens/Auth/signUp
          - src/screens/Auth/signUP/__tests__
          - src/screens/Auth/signUp/index.tsx // view
          - src/screens/Auth/signUp/signUpSlice.tsx // redux-slice
          - src/screens/Auth/signUp/signUpUserCases.ts // define use-cased or hooks used in login/index.tsx
    - src/screens/DeveloperMenu // for dev/QA usage only
    - src/screens/Profile
    - src/screens/Home/
    - src/screens/SingleTodoList/


2. define Arch and designs patterns that we will be using
 - I will start with 
       - feature/module based arch, 
       - combine it with DUCK arch for defining redux-slices 
       - within each module and use MVVM design pattern to add decoupling

3. State management used in the app
    - will use redux for app state management and use redux-persist with mmkv as storage option to persist TODO list data within App
4. Network layer usage, does, Real time updated required that means web-socket usage required or not?
   - for starting this layer is not required, as we are not using any BE for this TODO app
   but we add this layer to define network layer configuration
5. Define Core -- APP root, navigation, deeplinking.
   - this will contains core modules like navigation (will use react-navigation)
   - will use react-navigation's screen-options to handle deeplinking/notifications handling.
   - can use this root layer to inject some dependencies with in viewModal of each feature/module,
   so that view-modal layer will not directly imports or get depends on infra/data layer
6. Testing - JEST, Sanapshot testing, e2e using detox for End to end testing.
    - add unit test case and Sanapshot test cases within each module/feature.
    - can add e2e test cases at root level or at module level
7. define CI-CD pipelined 
 - for this will use fastlane with github-action
  so, I will follow below follow
     - tag a main branch, which is write-blocked for each user
     - whenever there is merge-commit into main
        github-action will trigger basics gatekeeper checks like 
          - ESLint
          - type checking
          - unit-test and integration test case
          - post above steps gave us go ahead, github-action will trigger build using fastlane release/gamma lane
          - build will get created in above step,
            - upload build to proper environments like firebase for feature testing
            - upload build to play-store/app-store once get go ahead for sanity
            - staged rollout the release

8. Tools will be using
    - redux and redux-persist for state management
    - mmkv for fast read/write to be stored for further level
    - jest for snapshot, unit/integration test cases
    - detox for e2e automation test cases
    - react-navigation for navigation
    - moe/google/branch/firebase etc for analytics service
    - axios for API calling



Now comes at data flow part, or LLD designs for auth/login module
  - once user open app, and it is non-logged user,
     - it will screen -> src/screens/Auth/login/view/index.tsx // view
      - all component level state for this component is maintained by 
      - view/screen will use - src/screens/Auth/login/viewModal - useCases for local state management and api calling
      - src/screens/Auth/login/viewModals are get injected with src/screens/Auth/login/modal/service.ts from root app
      - this use case will call the service defined in - src/screens/Auth/login/data layer
      - this service will hit the required API using async actions injected from root.
      - async action will call api, update redux state in response.
      - view in this  case will get update using useSelector hook and update screens as required,
 