import analytics from '@react-native-firebase/analytics';

const firebaseAnalytics = analytics();

export const setUserId = (userId: string) => {
    firebaseAnalytics.setUserId(userId);
};

export const recordLogin = () => {
    firebaseAnalytics.logEvent('login');
}

export const recordSignupRequest = (firstName: string, lastName: string, phone: string) => {
    firebaseAnalytics.logEvent('signup_request', {
        firstName,
        lastName,
        phone
    });
}

export const recordSuccessfulVerify = () => {
    firebaseAnalytics.logEvent('successful_verify');
}

export const recordUnsuccessfulVerify = () => {
    firebaseAnalytics.logEvent('unsuccessful_verify');
}

export const recordSignup = () => {
    firebaseAnalytics.logEvent('sign_up');
}

export const recordLogOut = () => {
    firebaseAnalytics.logEvent('logout');
}

export const recordCheckSuperlative = (superlative: string, fromScreen: string) => {
    firebaseAnalytics.logEvent('check_superlative', { superlative, fromScreen });
}

export const recordVote = (superlative: string, winner: string, loser: string) => {
    firebaseAnalytics.logEvent('vote', { superlative, winner, loser });
}

export const recordCircleOpen = (circle: string) => {
    firebaseAnalytics.logEvent('circle_open', { circle });
}

export const recordCircleCreationPageOpen = () => {
    firebaseAnalytics.logEvent('circle_creation_page_open');
}

export const superlativeManagePageOpened = () => {
    firebaseAnalytics.logEvent('superlative_manage_page_opened');
}

export const memberManagePageOpened = () => {
    firebaseAnalytics.logEvent('member_manage_page_opened');
}

export const addSuperlativePageOpened = () => {
    firebaseAnalytics.logEvent('add_superlative_page_opened');
}

export const selectSuperlativeFromQuestionPackChosen = () => {
    firebaseAnalytics.logEvent('question_pack_chosen');
}

export const selectCustomSuperlativeChosen = () => {
    firebaseAnalytics.logEvent('custom_superlative_chosen');
}

export const customSuperlativeAdded = () => {
    firebaseAnalytics.logEvent('custom_superlative_added');
}

export const superlativeDeleted = (circle: string, superlative: string) => {
    firebaseAnalytics.logEvent('superlative_deleted', { circle, superlative });
}

export const memberRemoved = (memberId: string, circleId: string) => {
    firebaseAnalytics.logEvent('member_removed', { memberId, circleId });
}

export const seeAllMembersPageOpened = () => {
    firebaseAnalytics.logEvent('see_all_members_page_opened');
}

export const invitePageOpened = () => {
    firebaseAnalytics.logEvent('invite_page_opened');
}

export const inviteSent = (phone: string, fromContacts: boolean) => {
    firebaseAnalytics.logEvent('invite_sent', { phone, fromContacts });
}