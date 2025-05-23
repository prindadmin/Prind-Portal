// AUTH Actions
export const AUTH_INIT = 'AUTH_INIT'
export const AUTH_GET_USER = 'AUTH_GET_USER'
export const AUTH_SET_STATE = 'AUTH_SET_STATE'
export const AUTH_SIGN_UP = 'AUTH_SIGN_UP'
export const AUTH_SIGN_IN = 'AUTH_SIGN_IN'
export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT'
export const AUTH_FORGOT_PASSWORD = 'AUTH_FORGOT_PASSWORD'
export const AUTH_CHANGE_PASSWORD = 'AUTH_CHANGE_PASSWORD'
export const AUTH_COMPLETE_NEW_PASSWORD = 'AUTH_COMPLETE_NEW_PASSWORD'
export const AUTH_CHANGE_SUCCESSFUL = 'AUTH_CHANGE_SUCCESSFUL'
export const AUTH_REFRESH_SESSION = 'AUTH_REFRESH_SESSION'

export const AUTH_CONFIRM_USER_REQUESTED = 'AUTH_CONFIRM_USER_REQUESTED'
export const AUTH_CONFIRM_USER_REQUEST_SENT = 'AUTH_CONFIRM_USER_REQUEST_SENT'
export const AUTH_CONFIRM_USER_REQUEST_FAILED = 'AUTH_CONFIRM_USER_REQUEST_FAILED'

export const PROJECT_INIT = "PROJECT_INIT"
export const PROJECT_ID_CHANGED = "PROJECT_ID_CHANGED"
export const PROJECT_SET_STATE = "PROJECT_SET_STATE"
export const PROJECT_LOAD_DATA_TO_FORM = "PROJECT_LOAD_DATA_TO_FORM"
export const PROJECT_RESET_CHOSEN_PROJECT = "PROJECT_RESET_CHOSEN_PROJECT"
export const PROJECT_RESET_DOWNLOAD_URL = "PROJECT_RESET_DOWNLOAD_URL"

export const PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED = 'PROJECT_UPDATE_PROJECT_CHOSEN_REQUESTED'
export const PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_SENT = 'PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_SENT'
export const PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_FAILED = 'PROJECT_UPDATE_PROJECT_CHOSEN_REQUEST_FAILED'

export const PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED = "PROJECT_GET_ACCESSIBLE_PROJECTS_REQUESTED"
export const PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_SENT = "PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_SENT"
export const PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_FAILED = "PROJECT_GET_ACCESSIBLE_PROJECTS_REQUEST_FAILED"

export const PROJECT_CREATE_PROJECT_REQUESTED = 'PROJECT_CREATE_PROJECT_REQUESTED'
export const PROJECT_CREATE_PROJECT_REQUEST_SENT = 'PROJECT_CREATE_PROJECT_REQUEST_SENT'
export const PROJECT_CREATE_PROJECT_REQUEST_FAILED = 'PROJECT_CREATE_PROJECT_REQUEST_FAILED'

export const PROJECT_DELETE_PROJECT_REQUESTED = 'PROJECT_DELETE_PROJECT_REQUESTED'
export const PROJECT_DELETE_PROJECT_REQUEST_SENT = 'PROJECT_DELETE_PROJECT_REQUEST_SENT'
export const PROJECT_DELETE_PROJECT_REQUEST_FAILED = 'PROJECT_DELETE_PROJECT_REQUEST_FAILED'

export const PROJECT_UPDATE_PROJECT_DETAILS_REQUESTED = 'PROJECT_UPDATE_PROJECT_DETAILS_REQUESTED'
export const PROJECT_UPDATE_PROJECT_DETAILS_REQUEST_SENT = 'PROJECT_UPDATE_PROJECT_DETAILS_REQUEST_SENT'
export const PROJECT_UPDATE_PROJECT_DETAILS_REQUEST_FAILED = 'PROJECT_UPDATE_PROJECT_DETAILS_REQUEST_FAILED'

export const PROJECT_GET_CURRENT_MEMBERS_REQUESTED = 'PROJECT_GET_CURRENT_MEMBERS_REQUESTED'
export const PROJECT_GET_CURRENT_MEMBERS_REQUEST_SENT = 'PROJECT_GET_CURRENT_MEMBERS_REQUEST_SENT'
export const PROJECT_GET_CURRENT_MEMBERS_REQUEST_FAILED = 'PROJECT_GET_CURRENT_MEMBERS_REQUEST_FAILED'

export const PROJECT_UPLOAD_FILE_REQUESTED = 'PROJECT_UPLOAD_FILE_REQUESTED'
export const PROJECT_UPLOAD_FILE_REQUEST_SENT = 'PROJECT_UPLOAD_FILE_REQUEST_SENT'
export const PROJECT_UPLOAD_FILE_REQUEST_FAILED = 'PROJECT_UPLOAD_FILE_REQUEST_FAILED'

export const PROJECT_CREATE_FIELD_REQUESTED = 'PROJECT_CREATE_FIELD_REQUESTED'
export const PROJECT_CREATE_FIELD_REQUEST_SENT = 'PROJECT_CREATE_FIELD_REQUEST_SENT'
export const PROJECT_CREATE_FIELD_REQUEST_FAILED = 'PROJECT_CREATE_FIELD_REQUEST_FAILED'

export const PROJECT_UPDATE_FIELD_REQUESTED = 'PROJECT_UPDATE_FIELD_REQUESTED'
export const PROJECT_UPDATE_FIELD_REQUEST_SENT = 'PROJECT_UPDATE_FIELD_REQUEST_SENT'
export const PROJECT_UPDATE_FIELD_REQUEST_FAILED = 'PROJECT_UPDATE_FIELD_REQUEST_FAILED'

export const PROJECT_DOWNLOAD_FILE_REQUESTED = 'PROJECT_DOWNLOAD_FILE_REQUESTED'
export const PROJECT_DOWNLOAD_FILE_REQUEST_SENT = 'PROJECT_DOWNLOAD_FILE_REQUEST_SENT'
export const PROJECT_DOWNLOAD_FILE_REQUEST_FAILED = 'PROJECT_DOWNLOAD_FILE_REQUEST_FAILED'

export const PROJECT_FILE_SIGNATURE_REQUEST_REQUESTED = 'PROJECT_FILE_SIGNATURE_REQUEST_REQUESTED'
export const PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_SENT = 'PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_SENT'
export const PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_FAILED = 'PROJECT_FILE_SIGNATURE_REQUEST_REQUEST_FAILED'




export const MEMBERS_INIT = "MEMBERS_INIT"
export const MEMBERS_SET_STATE = "MEMBERS_SET_STATE"
export const MEMBERS_ADD_MEMBERS_REQUESTED = 'MEMBERS_ADD_MEMBERS_REQUESTED'
export const MEMBERS_ADD_MEMBERS_REQUEST_SENT = 'MEMBERS_ADD_MEMBERS_REQUEST_SENT'
export const MEMBERS_ADD_MEMBERS_REQUEST_FAILED = 'MEMBERS_ADD_MEMBERS_REQUEST_FAILED'

export const MEMBERS_REMOVE_MEMBERS_REQUESTED = 'MEMBERS_REMOVE_MEMBERS_REQUESTED'
export const MEMBERS_REMOVE_MEMBERS_REQUEST_SENT = 'MEMBERS_REMOVE_MEMBERS_REQUEST_SENT'
export const MEMBERS_REMOVE_MEMBERS_REQUEST_FAILED = 'MEMBERS_REMOVE_MEMBERS_REQUEST_FAILED'

export const MEMBERS_GET_AVAILABLE_ROLES_REQUESTED = 'MEMBERS_GET_AVAILABLE_ROLES_REQUESTED'
export const MEMBERS_GET_AVAILABLE_ROLES_REQUEST_SENT = 'MEMBERS_GET_AVAILABLE_ROLES_REQUEST_SENT'
export const MEMBERS_GET_AVAILABLE_ROLES_REQUEST_FAILED = 'MEMBERS_GET_AVAILABLE_ROLES_REQUEST_FAILED'


export const PAGE_INIT = "PAGE_INIT"
export const PAGE_SET_STATE = "PAGE_SET_STATE"
export const PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL = 'PROJECT_UPLOAD_FILE_REQUEST_SUCCESSFUL'
export const PAGE_GET_CONTENT_REQUESTED = 'PAGE_GET_CONTENT_REQUESTED'
export const PAGE_GET_CONTENT_REQUEST_SENT = 'PAGE_GET_CONTENT_REQUEST_SENT'
export const PAGE_GET_CONTENT_REQUEST_FAILED = 'PAGE_GET_CONTENT_REQUEST_FAILED'

export const FOUNDATIONS_INIT = 'FOUNDATIONS_INIT'
export const FOUNDATIONS_SET_STATE = 'FOUNDATIONS_SET_STATE'

export const FOUNDATIONS_SELF_SIGN_FILE_REQUESTED = 'FOUNDATIONS_SELF_SIGN_FILE_REQUESTED'
export const FOUNDATIONS_SELF_SIGN_FILE_REQUEST_SENT = 'FOUNDATIONS_SELF_SIGN_FILE_REQUEST_SENT'
export const FOUNDATIONS_SELF_SIGN_FILE_REQUEST_FAILED = 'FOUNDATIONS_SELF_SIGN_FILE_REQUEST_FAILED'

export const FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUESTED = 'FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUESTED'
export const FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUEST_SENT = 'FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUEST_SENT'
export const FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUEST_FAILED = 'FOUNDATIONS_REJECT_SIGNATURE_REQUEST_REQUEST_FAILED'



export const USER_INIT = 'USER_INIT'
export const USER_SET_STATE = 'USER_SET_STATE'

export const USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUESTED = 'USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUESTED'
export const USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUEST_SENT = 'USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUEST_SENT'
export const USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUEST_FAILED = 'USER_S3_UPLOAD_PROJECT_FILE_TOKEN_REQUEST_FAILED'

export const USER_S3_UPLOAD_USER_FILE_TOKEN_REQUESTED = 'USER_S3_UPLOAD_USER_FILE_TOKEN_REQUESTED'
export const USER_S3_UPLOAD_USER_FILE_TOKEN_REQUEST_SENT = 'USER_S3_UPLOAD_USER_FILE_TOKEN_REQUEST_SENT'
export const USER_S3_UPLOAD_USER_FILE_TOKEN_REQUEST_FAILED = 'USER_S3_UPLOAD_USER_FILE_TOKEN_REQUEST_FAILED'

export const USER_GET_DETAILS_REQUESTED = 'USER_GET_DETAILS_REQUESTED'
export const USER_GET_DETAILS_REQUEST_SENT = 'USER_GET_DETAILS_REQUEST_SENT'
export const USER_GET_DETAILS_REQUEST_FAILED = 'USER_GET_DETAILS_REQUEST_FAILED'

export const USER_GET_PROJECT_INVITATIONS_REQUESTED = 'USER_GET_PROJECT_INVITATIONS_REQUESTED'
export const USER_GET_PROJECT_INVITATIONS_REQUEST_SENT = 'USER_GET_PROJECT_INVITATIONS_REQUEST_SENT'
export const USER_GET_PROJECT_INVITATIONS_REQUEST_FAILED = 'USER_GET_PROJECT_INVITATIONS_REQUEST_FAILED'

export const USER_PROJECT_INVITATION_SEND_RESPONSE_REQUESTED = 'USER_PROJECT_INVITATION_SEND_RESPONSE_REQUESTED'
export const USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_SENT = 'USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_SENT'
export const USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_FAILED = 'USER_PROJECT_INVITATION_SEND_RESPONSE_REQUEST_FAILED'

export const USER_GET_PROJECT_SIGNATURES_REQUESTED = 'USER_GET_PROJECT_SIGNATURES_REQUESTED'
export const USER_GET_PROJECT_SIGNATURES_REQUEST_SENT = 'USER_GET_PROJECT_SIGNATURES_REQUEST_SENT'
export const USER_GET_PROJECT_SIGNATURES_REQUEST_FAILED = 'USER_GET_PROJECT_SIGNATURES_REQUEST_FAILED'

export const USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUESTED = 'USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUESTED'
export const USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_SENT = 'USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_SENT'
export const USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_FAILED = 'USER_PROJECT_SIGNATURE_SEND_RESPONSE_REQUEST_FAILED'

export const USER_GET_HISTORY_REQUESTED = 'USER_GET_HISTORY_REQUESTED'
export const USER_GET_HISTORY_REQUEST_SENT = 'USER_GET_HISTORY_REQUEST_SENT'
export const USER_GET_HISTORY_REQUEST_FAILED = 'USER_GET_HISTORY_REQUEST_FAILED'

// Procore
export const PROCORE_INIT = 'PROCORE_INIT'
export const PROCORE_SET_STATE = 'PROCORE_SET_STATE'
export const USER_AUTHORISE_PROCORE_ACCESS_REQUESTED = 'USER_AUTHORISE_PROCORE_ACCESS_REQUESTED'
export const USER_CHECK_SERVER_PROCORE_ACCESS_REQUESTED = 'USER_CHECK_SERVER_PROCORE_ACCESS_REQUESTED'
export const PROCORE_GET_PROJECT_FILES_AND_FOLDERS = 'PROCORE_GET_PROJECT_FILES_AND_FOLDERS'
