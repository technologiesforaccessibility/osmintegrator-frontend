// Keep alphabetical order for at least highest level keys to make it easier to work with

export const en = {
  translation: {
    400: 'Provided values must be valid',
    buttons: {
      save: 'Save',
      confirm: 'Confirm',
      cancel: 'Cancel',
      reset: 'Reset',
      send: 'Send',
    },
    connection: {
      formTitle: 'Create new connection',
      createSuccessMessage: 'New connection created',
      deleteSuccessMessage: 'Connection deleted',
      deleteConnectionInfo: 'Click line if you want to delete connection',
      deleteConnectionConfirmation: 'Delete?',
      mark2Stops: 'Mark 2 stops',
      differentTypeError: 'It is not allowed to connect stops of the same type.',
    },
    contactForm: {
      description: 'Login problem? Need to contact? Send us a ',
      message: 'message',
    },
    finishTile: {
      editorMainButton: 'Send tile to verification',
      supervisorMainButton: 'Approve editor\'s work',
      confirmation: 'Are you sure?',
      successMessage: 'Tile has bent sent',
      failMessage: 'Tile cannot be sent',
    },
    login: {
      title: 'Welcome',
      password: 'Password',
      loginText: 'Log in',
      forgotPassword: 'Forgot Username / Password ?',
      401: 'Wrong email or password',
      register: 'Sign up',
    },
    logout: {title: 'You have been logged out', message: 'You will be redirect to login page soon.', button: 'Log out', loginButton: 'Log in'},
    map: {},
    profileHeader: 'Profile',
    profileMVPPlaceholder:
      'If you want to change email or password, please send email to kontakt@rozwiazaniadlaniewidomych.org or write a message on Slack #problems channel',
    recover: {
      title: 'Recover your password',
      button: 'Reset your password',
      401: 'Are you sure you have sent correct email?',
      emailSent: 'Recovery link has been sent to your email',
    },
    register: {
      password: 'Password',
      confirmPassword: 'Confirm Password',
      button: 'Register',
      usernamePlaceholder: 'Username',
      usernamePrompt: 'Required username length is min. 3',
      usernameLengthError: 'Required username length is min. 3',
      usernameRequiredError: 'Enter username',
      emailInvalidError: 'Invalid Email',
      emailRequiredError: 'Enter email',
      passwordPlaceholder: 'Password',
      passwordConfirmationPlaceholder: 'Confirm password',
      passwordPrompt: 'Required password length is min. 8',
      passwordLengthError: 'Required password length is min. 8',
      passwordRequiredError: 'Enter password',
      passwordConfirmRequiredError: 'Confirm password',
      passwordRefError: 'Entered passwords are not the same',
      login: 'Login',
      reportPrompt: 'Report a problem',
      success: 'User has been registered. Confirm data by clicking a link in a message sent on provided email address',
      fail: 'Unknown register problem',
    },
    report: {
      button: 'Send report',
      clear: 'Clear text and map pin location',
      success: 'Report has been sent',
      fail: 'A problem occured',
      pinInfo: 'Click elsewhere to move marker',
      approve: 'Approve',
      approved: 'Report approved!',
      decline: 'Decline',
      closed: 'Report closed',
      approveInfo: 'Report is approved and taken into account.',
      rejectInfo: 'Report is rejected and will not be considered.',
      noTextFound: 'Fill report text',
      noPinFound: 'Click on map to create a location pin',
    },
    setPassword: {
      title: 'Set a new password',
      button: 'Change',
      401: 'Wrong email or expired link',
      password: 'Password',
      repeatPassword: 'Repeat password',
      invalidPasswords: 'Provided passwords must be the same and have 8+ chars',
      expiredToken: 'It looks like your token has expired. \n Reset your password again.',
      changedPassword: 'Password has been changed! \n You will be redirected do login page soon',
    },
    sidebar: {
      contact: 'Contact us',
      map: 'Map',
      profile: 'Profile',
      managementDashboard: 'Management Dashboard',
      history: 'History',
    },
    tileModePrompts: {
      view: 'View mode - see bus stop or report details',
      report: 'Create report on map',
      connection: 'Create new connection',
      back: 'Hide tile',
    },
    unrecognizedProblem: 'Something went wrong...',
    version: 'Version: ',
    managementPanel: {
      assignRoleTitle: 'Assign role to user',
      chooseUser: 'Choose user',
      save: 'save',
      selectUserMessage: 'Select user to display and edit his roles',
      selectTile: 'Select tile',
      assignUserToTile: 'Assign user to the tile',
      assigned: 'Assigned',
      noUser: 'None',
    },
    yes: 'Yes',
    no: 'No',
  },
};
