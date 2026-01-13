type Activity = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  description: string;
  category: string;
  isCancelled: boolean;
  city: string;
  venue: string;
  latitude: number;
  longitude: number;
  date: Date | string;
  host: {
    id: string;
    displayName: string;
    imageUrl: string;
    username: string;
  };
  hostId: string;
  attendees: Attendee[];
  isGoing?: boolean;
  isHost?: boolean;
};

type FormType = "view" | "create" | "edit" | "close";

type User = {
  id: string;
  displayName: string;
  username: string;
  imageUrl: string;
};

type Attendee = User & {
  isHost: boolean;
  // following: boolean;
};

type Photo = {
  id: string;
  url: string;
  isMain: boolean;
};

type Profile = User & {
  email?: string;
  photos?: Photo[];
  followersCount?: number;
  followingCount?: number;
  following?: boolean;
};

type CursorPagedList<T> = {
  items: T[];
  pageInfo: {
    hasNextPage: boolean;
    nextCursor: string;
  };
};
