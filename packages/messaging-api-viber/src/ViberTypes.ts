import {
  MaxLengthArray,
  OnRequestFunction,
} from '@sunray-eu/messaging-api-common';

export type ClientConfig = {
  accessToken: string;
  sender: Sender;
  origin?: string;
  onRequest?: OnRequestFunction;
};

export type SucceededResponseData<T extends object> = {
  status: 0;
  statusMessage: 'ok';
} & T;

export type FailedResponseData<T extends object> = (
  | {
      status: 1;
      statusMessage: 'invalidUrl';
    }
  | {
      status: 2;
      statusMessage: 'invalidAuthToken';
    }
  | {
      status: 3;
      statusMessage: 'badData';
    }
  | {
      status: 4;
      statusMessage: 'missingData';
    }
  | {
      status: 5;
      statusMessage: 'receiverNotRegistered';
    }
  | {
      status: 6;
      statusMessage: 'receiverNotSubscribed';
    }
  | {
      status: 7;
      statusMessage: 'publicAccountBlocked';
    }
  | {
      status: 8;
      statusMessage: 'publicAccountNotFound';
    }
  | {
      status: 9;
      statusMessage: 'publicAccountSuspended';
    }
  | {
      status: 10;
      statusMessage: 'webhookNotSet';
    }
  | {
      status: 11;
      statusMessage: 'receiverNoSuitableDevice';
    }
  | {
      status: 12;
      statusMessage: 'tooManyRequests';
    }
  | {
      status: 13;
      statusMessage: 'apiVersionNotSupported';
    }
  | {
      status: 14;
      statusMessage: 'incompatibleWithVersion';
    }
  | {
      status: 15;
      statusMessage: 'publicAccountNotAuthorized';
    }
  | {
      status: 16;
      statusMessage: 'inchatReplyMessageNotAllowed';
    }
  | {
      status: 17;
      statusMessage: 'publicAccountIsNotInline';
    }
  | {
      status: 18;
      statusMessage: 'noPublicChat';
    }
  | {
      status: 19;
      statusMessage: 'cannotSendBroadcast';
    }
  | {
      status: 20;
      statusMessage: 'broadcastNotAllowed';
    }
) &
  T;

export type SucceededBroadcastResponseData = SucceededResponseData<{
  messageToken: string;
  failedList: Failed[];
}>;

export type Failed = FailedResponseData<{ receiver: string }>;

export type ResponseData<T extends object> =
  | SucceededResponseData<T>
  | FailedResponseData<Record<string, never>>;

export type BroadcastResponseData =
  | SucceededBroadcastResponseData
  | FailedResponseData<Record<string, never>>;

export enum EventType {
  Delivered = 'delivered',
  Seen = 'seen',
  Failed = 'failed',
  Subscribed = 'subscribed',
  Unsubscribed = 'unsubscribed',
  ConversationStarted = 'conversation_started',
}

export type Sender = {
  name: string;
  avatar?: string;
};

export type Message =
  | TextMessage
  | PictureMessage
  | VideoMessage
  | FileMessage
  | ContactMessage
  | LocationMessage
  | UrlMessage
  | StickerMessage
  | RichMediaMessage;

export type MessageOptions = {
  minApiVersion?: number;
  sender?: Sender;
  trackingData?: string;
  keyboard?: Keyboard;
};

export type TextMessage = {
  type: 'text';
  text: string;
} & MessageOptions;

/**
 * Represents a picture object, which includes details and links to an image and its thumbnail.
 * This type is designed to encapsulate information about an image, including a textual description,
 * the main image URL, and an optional thumbnail URL. It ensures that images are handled efficiently
 * within a system, with support for JPEG format and considerations for file sizes and dimensions.
 */
export type Picture = {
  /**
   * Description of the photo. This can be an empty string if the description is irrelevant.
   * The description provides context or details about the image, with a maximum length of 120 characters.
   *
   * @remarks
   * It's recommended to keep the description concise to enhance readability and user experience.
   */
  text: string;

  /**
   * URL of the image in JPEG format. This property specifies the location of the main image.
   * The image size is limited to a maximum of 1 MB to ensure efficient loading and bandwidth usage.
   * Only JPEG format is supported for this image URL, catering to compatibility and standardization.
   *
   * @remarks
   * For other image formats or animated GIFs, consider using URL messages or file messages.
   */
  media: string;

  /**
   * Optional URL of a reduced size image in JPEG format, serving as a thumbnail for the main image.
   * The thumbnail's maximum size is 100 KB, supporting quicker load times and reduced data usage.
   * A recommended dimension for thumbnails is 400x400, optimizing for visibility and quality.
   *
   * @remarks
   * Similar to the main image, only JPEG format is supported for thumbnails to maintain consistency.
   */
  thumbnail?: string;
};

export type PictureMessage = {
  type: 'picture';
} & Picture &
  MessageOptions;

export type Video = {
  media: string;
  size: number;
  duration?: number;
  thumbnail?: string;
};

export type VideoMessage = {
  type: 'video';
} & Video &
  MessageOptions;

export type File = {
  media: string;
  size: number;
  fileName: string;
};

export type FileMessage = {
  type: 'file';
} & File &
  MessageOptions;

export type Contact = {
  name: string;
  phoneNumber: string;
};

export type ContactMessage = {
  type: 'contact';
  contact: Contact;
} & MessageOptions;

export type Location = {
  lat: string;
  lon: string;
};

export type LocationMessage = {
  type: 'location';
  location: Location;
} & MessageOptions;

export type UrlMessage = {
  type: 'url';
  media: string;
} & MessageOptions;

export type StickerMessage = {
  type: 'sticker';
  stickerId: number;
} & MessageOptions;

/**
 * Defines a rich media message format used for creating interactive content blocks.
 * This type includes configurations for the layout and appearance of buttons within a carousel.
 */
export type RichMedia = {
  /**
   * Specifies the type of the message, always 'rich_media' for this format.
   */
  type: 'rich_media';

  /**
   * Number of columns per carousel content block.
   * Default is 6 columns. Possible values range from 1 to 6.
   *
   * @remarks
   * Ensure the value is between 1 and 6 through runtime validation.
   */
  buttonsGroupColumns?: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Number of rows per carousel content block.
   * Default is 7 rows. Possible values range from 1 to 7.
   *
   * @remarks
   * Ensure the value is between 1 and 7 through runtime validation.
   */
  buttonsGroupRows?: 1 | 2 | 3 | 4 | 5 | 6 | 7;

  /**
   * The background color of the rich media message in hexadecimal format.
   */
  bgColor: string;

  /**
   * An array of buttons that are included within the rich media message, providing interactive elements for the user.
   */
  buttons: MaxLengthArray<RichMediaButton, 5>;
};

export type RichMediaButton = {
  columns: number;
  rows: number;
  text?: string;
  actionType: 'open-url' | 'reply';
  actionBody: string;
  textSize?: 'small' | 'medium' | 'large';
  textVAlign?: 'middle';
  textHAlign?: 'left' | 'middle' | 'right';
  image?: string;
};

export type RichMediaMessage = {
  type: 'rich_media';
  richMedia: RichMedia;
} & MessageOptions;

export type AccountInfo = {
  id: string;
  name: string;
  uri: string;
  icon: string;
  background: string;
  category: string;
  subcategory: string;
  location: {
    lon: number;
    lat: number;
  };
  country: string;
  webhook: string;
  eventTypes:
    | EventType.Delivered
    | EventType.Seen
    | EventType.Failed
    | EventType.ConversationStarted;
  subscribersCount: number;
  members: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  }[];
};

export type UserDetails = {
  id: string;
  name: string;
  avatar: string;
  country: string;
  language: string;
  primaryDeviceOs: string;
  apiVersion: number;
  viberVersion: string;
  mcc: number;
  mnc: number;
  deviceType: string;
};

export type UserOnlineStatus = {
  id: string;
  onlineStatus: 0 | 1 | 2 | 3 | 4;
  onlineStatusMessage: 'online';
};

export type FavoritesMetadata = {
  type: 'gif' | 'link' | 'video';
  url: string;
  title?: string;
  thumbnail?: string;
  domain?: string;
  width?: number;
  height?: number;
  alternativeUrl?: string;
  alternativeText?: string;
};

export type Keyboard = {
  type: 'keyboard';
  buttons: KeyboardButton[];
  bgColor?: string;
  defaultHeight?: boolean;
  customDefaultHeight?: number;
  heightScale?: number;
  buttonsGroupColumns?: number;
  buttonsGroupRows?: number;
  inputFieldState?: 'regular' | 'minimized' | 'hidden';
  favoritesMetadata?: FavoritesMetadata;
};

export type KeyboardButton = {
  columns?: number;
  rows?: number;
  bgColor?: string;
  silent?: boolean;
  bgMediaType?: 'picture' | 'gif';
  bgMedia?: string;
  bgMediaScaleType?: 'crop' | 'fill' | 'fit';
  imageScaleType?: 'crop' | 'fill' | 'fit';
  bgLoop?: boolean;
  actionType?:
    | 'reply'
    | 'open-url'
    | 'location-picker'
    | 'share-phone'
    | 'none';
  actionBody: string;
  image?: string;
  text?: string;
  textVAlign?: 'top' | 'middle' | 'bottom';
  textHAlign?: 'left' | 'center' | 'right';
  textPaddings?: [number, number, number, number];
  textOpacity?: number;
  textSize?: 'small' | 'regular' | 'large';
  openURLType?: 'internal' | 'external';
  openURLMediaType?: 'not-media' | 'video' | 'gif' | 'picture';
  textBgGradientColor?: string;
  textShouldFit?: boolean;
  internalBrowser?: KeyboardButtonInternalBrowser;
  map?: KeyboardButtonMap;
  frame?: KeyboardButtonFrame;
  mediaPlayer?: KeyboardButtonMediaPlayer;
};

export type KeyboardButtonInternalBrowser = {
  actionButton?:
    | 'forward'
    | 'send'
    | 'open-externally'
    | 'send-to-bot'
    | 'none';
  actionPredefinedURL?: string;
  titleType?: 'domain' | 'default';
  customTitle?: string;
  mode?:
    | 'fullscreen'
    | 'fullscreen-portrait'
    | 'fullscreen-landscape'
    | 'partial-size';
  footerType?: 'default' | 'hidden';
  actionReplyData?: string;
};

export type KeyboardButtonMap = {
  latitude?: number;
  longitude?: number;
};

export type KeyboardButtonFrame = {
  borderWidth?: number;
  borderColor?: string;
  cornerRadius?: number;
};

export type KeyboardButtonMediaPlayer = {
  title?: string;
  subtitle?: string;
  thumbnailURL?: string;
  loop?: boolean;
};
