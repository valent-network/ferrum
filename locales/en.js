export default {
  listNotFound: "Not found",
  nav: {
    titles: {
      feed: "Feed",
      chats: "Chats",
      myAds: "My Ads",
      inviteFriends: "Invite Friends",
      language: "Language",
      createAd: "Create Ad",
    }
  },
  actions: {
    cancel: "Cancel",
    accept: "Accept",
    delete: "Delete",
    edit: "Edit",
    invite: "Invite",
    back: "Back",
    choose: "Choose",
    create: "Create",
    archive: "Archive",
    unarchive: "Unarchive",
    update: "Update",
  },
  buttons: {
    invite: "Invite",
    listNotfoundInviteFriends: "Invite Friends"
  },
  feed: {
    permissionBoxText: "Recario requiers access to contacts book in order to show your friends who are selling their cars right now",
    permissionBoxSubmit: "Grant",
    contactsProcessingText: "Processing contacts book...",
    search: {
      placeholder: "BMW X6 2016...",
    },
    filters:{
      headers: {
        knowThrough: "Know Through",
        main: "Filters",
        reset: "Reset",
        price: "Price",
        category: "Category",
      },
      from: "from",
      to: "to",
      submit: "Search",
    }
  },
  ad: {
    shareText: "Hi! You may know the seller:",
    invitationText: "Hey I've found your car, take a look here — https://recar.io/get",
    discussWithFriend: "Discuss with a friend",
    postedBy: "Posted by",
    options: { source: "Source" },
    deleted: "Deleted",
    restore: "Restore",
    addImages: "Add Images",
    alerts: {
      confirm_delete: "Are you sure you want to delete this ad? This action is irreversible",
      confirm_archive: "Are you sure you want to hide this ad? It won't be searchable but will remain untouched in chats, favorite ads and visited ads"
    },
    formErrors: {
      required: "Required field",
      minLength: "Too short, minimum length is:",
      maxLength: "Too long, maximum length is:",
      max: "Too big number, maximum is:",
      pattern: "Wrong format",
    },
    params: {
      title: "Title",
      description: "Description",
      short_description: "Short Description",
      price: "Price",
      category_id: "Category",
      region: "Region",
      city_id: "City",
      ad_images: "Ad Photos",
      notes: {
        title: "Main title of the ad",
        description: "Full ad text",
        short_description: "Short description to be shown in the feed",
        ad_images: "First photo will become the main photo of the ad",
        ad_images_non_native: "Please, re-upload the photos we've found on external resources",
      },
      placeholders: {
        title: "iPhone 15, in stock",
        description: "Detailed description including for example delivery and return conditions",
        short_description: "Short description to be show in the feed",
        category_id: "Choose Category",
        region: "Choose Region",
        city_id: "Choose City",
        price: '24022022',
      },
      buttons: {
        selectFriend: "Select",
        inviteFriend: "Invite",
        askFriend: "Ask",
        continueChat: "Continue",
      },
    },
  },
  ads: {
    visited: "Visited",
    favorite: "Favorite",
    myAds: "My ads",
    knows: "Known through",
    knowsMore: "and",
    knowsMorePostfix: " more",
  },
  chat: {
    systemChatTitle: "Recario",
    you: "You",
    introHeader: "Your friend name for other chat members:",
    nameYourselfText: "To start chat, please choose how others can address you by name:",
    oneMember: "member",
    twoMembers: "members",
    threeMembers: "members",
    settings: {
      more: "More",
      members: "Members",
      mayKnow: "Friends may know the seller",
      leaveChat: "Leave chat",
      leaveChatTitle: "You will lose access to all the messages unless somebody from this chat invites you back"
    },
    actions: {
      leave: "Leave",
      cancel: "Cancel",
      copyMessage: "Copy message",
      deleteMessage: "Delete message",
      systemChatHeader: "System chat\nYou can come back any moment",
    },
    buttons: {
      addFriend: "Add",
      setMyName: "Save"
    },
    placeholders: {
      introduceFriend: "Introduce your friend...",
      yourName: "Your name...",
      message: "Message...",
      loadMore: "Load more..."
    },
    system: {
      init: "asked about this ad",
      left: "left the chat",
      add: "joined the chat",
    }
  },
  profile: {
    shareTitle: "Recario — buy and sell cars through friends and mates",
    shareMessage: "Get Recario: https://recar.io/get",
    inviteFriendSMSText: "Hi, see what I've got — its so easy to buy or sell a car through your friends and mates! https://recar.io/get",
    deleteContactsNote: "Keep in mind to turn off permission to your contacts in settings to not get them synchronized again after application reload",
    inviteFriendsNote: "The more friends in Recario — the more benefits you get. Even if your friends are personally not interested in buying or selling cars, they may have friends and mates who do",
    nameNotPresent: "No name",
    contactsSuccessfullyDeleted: "Contacts successfully deleted",
    actions: {
      changeAvatarTitle: "Change profile picture",
      deleteContactsTitle: "Are you sure you want to delete your contacts from Recario servers? To restore, simply reload the application",
      pickFromGallery: "Pick from the gallery...",
      signOut: "Sign out",
      signOutTitle: "Are you sure you want to sign out?",
      enterRefCode: "Enter Invitation Code",
      searchAds: "Search ads",
      block: "Block",
      unblock: "Unblock"
    },
    placeholders: {
      userContactsSearch: "Search..."
    },
    labels: {
      name: "Name",
      refCode: "Invitation code",
      phoneNumber: "Phone number",
      contactsBook: "Contacts book",
      friends: "Friends",
      inviteFriends: "Invite friends",
      support: "Contact support",
      tos: "Terms of service",
      privacy: "Privacy policy",
      signOut: "Sign out"
    },
    referrer: {
      callToAction: "Invite your friend and make Recario even more useful for yourself!",
      friendInvitesYou: "invites you to explore Recario together",
      buttons: {
        accepting: "I accept the invitation"
      },
      actions: {
        titleConfirmP1: "Attention, you confirm you were invited by",
        titleNoChangeP2: "You can't change this in future.",
      },
      errors: {
        selfInvitation: "Can't invite yourself",
        userNotFound: "User not found",
      },
    },
  },
  login: {
    companyName: "R E C A R I O",
    agreeTos: "I agree with",
    tos: "Terms of Service",
    changeNumber: "Change phone number",
    didntReceive: "Didn't receive the code?",
    tryAgain: "Send again",
    buttons: {
      getCode: "Get Code",
      signIn: "Sign In"
    },
    headers: {
      main: "Sign in using your phone number",
      secondary: "We will send you an SMS with the code so you don't have to remember yet another password",
      smsWasSent: "SMS with the code was sent to",
      enterSms: "Enter code from SMS",
    }
  },
  wizzard: {
    helloPros1: "Find friends and mates selling cars right now",
    helloPros2: "Ask a friend to tell you more about the seller",
    helloPros3: "Help friends to find their dream cars",
    helloH1: "Stay up to date using Recario",
    helloSubmit: "Got it",
    contactsPros1: "We will upload your contacts book to our servers from time to time",
    contactsPros2: "It is necessary in order to show you ads of your friends and mates",
    contactsPros3: "You can remove your contacts book from our servers at any time",
    contactsH1: "Get all your friends to Recario",
    contactsSubmit: "Next",
    notificationsPros1: "Only the most important notifications are sent to not disturb you without a reason",
    notificationsH1: "Keep in touch with Recario",
    notificationsSubmit: "Continue",
  },
  notifications: {
    profile: {
      copyRefcode: "Invitation code was successfully copied"
    }
  },
  errors: {
    title: "We are sorry, some error occured :(",
    connectionErrorMessage: "Internet connection error"
  },
  session: {
    errors: {
      authPhoneInvalidFormat: "Phone number must have 9 digits",
      authCodeInvalidFormat: "Code must have 4 digits",
    }
  }
}
