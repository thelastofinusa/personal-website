type WithType<T extends string> = {
  type: T;
  message: string;
  suggestion?: string;
};

export type TextType = WithType<"text">;

export type LinkType = WithType<"link"> & {
  url: string;
  title?: string;
  description?: string;
  image?: string;
};

export type RouteType = WithType<"route"> & {
  path?: string;
  images?: string[];
  label?: string;
  newTab?: boolean;
};

export type ButtonType = WithType<"button"> & {
  buttons: Array<{
    label: string;
    url: string;
    newTab?: boolean;
  }>;
};

export type FormType = WithType<"form"> & {
  fields: Array<{
    field: "input" | "textarea";
    type?: string;
    name: string;
    placeholder?: string;
    error?: string;
  }>;
};

export type MessageContentType =
  | TextType
  | RouteType
  | ButtonType
  | FormType
  | LinkType;

type SenderFromType = "holiday" | "anonymous" | "client";

type SenderType = {
  from: SenderFromType;
  name?: string;
  avatar?: string;
};

export type MessageType = {
  sender: SenderType;
  content: Array<MessageContentType>;
};

export const homeMessages: Array<MessageType> = [
  {
    sender: {
      from: "holiday",
      name: "Holiday",
      avatar: "/images/holiday.jpg",
    },
    content: [
      {
        type: "text",
        message: "Hey there 👋",
      },
      {
        type: "text",
        message: "Need any assistance?",
      },
    ],
  },
  {
    sender: {
      from: "anonymous",
      name: "Anonymous",
    },
    content: [
      {
        type: "text",
        message: "Your portfolio is giving iMessage vibes",
        suggestion: "Nice portfolio",
      },
    ],
  },
  {
    sender: {
      from: "holiday",
      name: "Holiday",
      avatar: "/images/holiday.jpg",
    },
    content: [
      {
        type: "text",
        message: "Thanks.",
      },
      {
        type: "text",
        message: "I got the inspiration from framer",
      },
      {
        type: "link",
        message: "I got the inspiration from this site",
        title: "Messenger",
        image:
          "https://framerusercontent.com/images/1hCvuJbJc7kBO5ANU367V1u2kM.jpg",
        description:
          "Messenger is a personal website template made for Framer. It features an interactive conversational style designed for creatives to show their work and experience, as well as featuring other types of content.",
        // url: "https://messenger.framer.website/home-static",
        url: "https://www.postman.com/",
      },
    ],
  },
  {
    sender: {
      from: "anonymous",
      name: "Anonymous",
    },
    content: [
      {
        type: "text",
        message: "What project have you workedon?",
      },
    ],
  },
  {
    sender: {
      from: "holiday",
      name: "Holiday",
      avatar: "/images/holiday.jpg",
    },
    content: [
      {
        type: "text",
        message: "Here are some of my featured work",
      },
      {
        type: "route",
        message:
          "dApp/ui.\n\nThe Production-ready Web3 components for seamless blockchain interactions across multiple networks.",
        path: "/projects/dapp-ui",
        label: "Open dApp/ui",
        images: [
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
        ],
      },
      {
        type: "route",
        message: "These are just a few of the projects I've worked on.",
        path: "/projects",
      },
    ],
  },
  {
    sender: {
      from: "anonymous",
      name: "Anonymous",
    },
    content: [
      {
        type: "text",
        message: "Any reviews?",
      },
    ],
  },
  {
    sender: {
      from: "holiday",
      name: "Holiday",
      avatar: "/images/holiday.jpg",
    },
    content: [
      {
        type: "text",
        message:
          "Yeah, I have a lot of reviews from clients I've worked with over the years",
      },
      {
        type: "route",
        message: "You can check them out here.",
        path: "/reviews",
      },
    ],
  },
  {
    sender: {
      from: "anonymous",
      name: "Anonymous",
    },
    content: [
      {
        type: "text",
        message: "How do I reach out?",
      },
    ],
  },
  {
    sender: {
      from: "holiday",
      name: "Holiday",
      avatar: "/images/holiday.jpg",
    },
    content: [
      {
        type: "button",
        message:
          "I mostly use X and LinkedIn to communicate. If you'd like a face-to-face chat, book a slot in my calendar for a video call!",
        buttons: [
          {
            label: "DM me on WhatsApp",
            url: "https://api.whatsapp.com/send?phone=2348128157510",
            newTab: true,
          },
          {
            label: "Send me a DM on 𝕏",
            url: "https://x.com/thelastofinusa",
            newTab: true,
          },
          {
            label: "Connect on LinkedIn",
            url: "https://linkedin.com/in/thelastofinusa",
            newTab: true,
          },
        ],
      },
      {
        type: "form",
        message:
          "You can also just leave me a message and I'll try to get back to you as soon as possible.",
        fields: [
          {
            field: "input",
            type: "text",
            name: "name",
            placeholder: "John Doe",
            error: "I need your name to continue.",
          },
          {
            field: "input",
            type: "email",
            name: "email",
            placeholder: "johndoe@gmail.com",
            error: "Share your email so I can reach you.",
          },
          {
            field: "textarea",
            name: "message",
            placeholder: "Enter your message",
            error: "Tell me what you want to say.",
          },
        ],
      },
    ],
  },
];

export const projectMessages: Array<MessageType> = [
  {
    sender: {
      from: "anonymous",
      name: "Anonymous",
    },
    content: [
      {
        type: "text",
        message: "Show me all your projects",
      },
    ],
  },
  {
    sender: {
      from: "holiday",
      name: "Holiday",
      avatar: "/images/holiday.jpg",
    },
    content: [
      {
        type: "text",
        message: "Here are some of my featured work",
      },
      {
        type: "route",
        message:
          "GADA Studios is a branding agency that specializes in branding and design services.",
        path: "/projects/gada-studio",
        label: "Open GADA Studios",
        images: [
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
        ],
      },
      {
        type: "route",
        message:
          "dApp/ui.\n\nThe Production-ready Web3 components for seamless blockchain interactions across multiple networks.",
        path: "/projects/dapp-ui",
        label: "Open dApp/ui",
        images: [
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
        ],
      },
    ],
  },
];

export const projectDetailsMessages: Array<MessageType> = [
  {
    sender: {
      from: "anonymous",
      name: "Anonymous",
    },
    content: [
      {
        type: "text",
        message: "What's this project about?",
      },
    ],
  },
  {
    sender: {
      from: "holiday",
      name: "Holiday",
      avatar: "/images/holiday.jpg",
    },
    content: [
      {
        type: "route",
        message:
          "dApp/ui is the production-ready web3 components for seamless blockchain interactions across multiple networks.",
        images: [
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
        ],
        path: "https://dappui.vercel.app",
        newTab: true,
      },
      {
        type: "text",
        message:
          "Built ontop of shadcn ui, dApp/ui is open-source, custimizable and user friendly.",
      },
      {
        type: "route",
        message:
          "Want to contribute? Click the link below, follow the instructios on the README.md file",
        path: "https://github.com/web3-blocks/dapp-ui",
        label: "github.com",
        newTab: true,
      },
    ],
  },
];

export const reviewsMessages: Array<MessageType> = [
  {
    sender: {
      from: "anonymous",
      name: "Anonymous",
    },
    content: [
      {
        type: "text",
        message: "What do you think of Holiday's work?",
      },
    ],
  },
  {
    sender: {
      from: "client",
      name: "Daniel, CEO of Bookclub",
      avatar:
        "https://framerusercontent.com/images/tPYkIwImGTYNrIWUAK9mkYyUgw.jpg?scale-down-to=1024",
    },
    content: [
      {
        type: "text",
        message:
          "I loved Holiday's collaborative spirit. He was open to feedback and made the process enjoyable.",
      },
    ],
  },
  {
    sender: {
      from: "client",
      name: "Alexa Scott",
    },
    content: [
      {
        type: "text",
        message:
          "As a startup, we struggled to find our visual voice until we collaborated with Holiday.",
      },
      {
        type: "text",
        message:
          "He guided us through the process with patience and insight, resulting in a brand identity that truly resonates with our target audience.",
      },
    ],
  },
  {
    sender: {
      from: "anonymous",
      name: "Anonymous",
    },
    content: [
      {
        type: "text",
        message: "Nice, would recommend",
        suggestion: "👍",
      },
    ],
  },
  {
    sender: {
      from: "holiday",
      name: "Holiday",
      avatar: "/images/holiday.jpg",
    },
    content: [
      {
        type: "text",
        message: "These are all the reviews that I've received so far.",
      },
      {
        type: "text",
        message: "I'm looking forward to working with you again in the future.",
      },
    ],
  },
];
