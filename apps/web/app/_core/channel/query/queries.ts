export const channelKeys = {
  all: ["channels"],
};

export const channelUserProfileKeys = {
  all: [...channelKeys.all, "user-profile"],
  lists: () => [...channelUserProfileKeys.all, "lists"],
  list: () => {},
  detail: () => {},
};

export const channelStudioKeys = {};
