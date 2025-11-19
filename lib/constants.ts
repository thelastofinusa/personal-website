import { MessageType } from "./types";

import { RiTwitterXFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io5";
import { BsFacebook } from "react-icons/bs";
import { IoLogoInstagram } from "react-icons/io5";
import { BsDiscord } from "react-icons/bs";
import { IoLogoTiktok } from "react-icons/io5";

export const footerRoutes = {
  routes: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about-me",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Reviews",
      href: "/reviews",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  socials: [
    {
      name: "𝕏/Twitter",
      icon: RiTwitterXFill,
      href: "https://x.com.com/thelastofinusa",
    },
    {
      name: "LinkedIn",
      icon: IoLogoLinkedin,
      href: "https://linkedin.com/in/thelastofinusa",
    },
    {
      name: "Instagram",
      icon: IoLogoInstagram,
      href: "https://instagram.com/thelastofinusa",
    },
    {
      name: "Discord",
      icon: BsDiscord,
      href: "https://discord.com/thelastofinusa",
    },
    {
      name: "Facebook",
      icon: BsFacebook,
      href: "https://facebook.com/thelastofinusa",
    },
    {
      name: "Tiktok",
      icon: IoLogoTiktok,
      href: "https://tiktok.com/thelastofinusa",
    },
  ],
};

export const homeMessages: MessageType[] = [
  {
    from: "Holiday",
    type: "me",
    content: [
      {
        text: [
          "Greetings, Human!",
          "I'm Holiday, a web3 frontend engineer based in Nigeria. How can I help?",
        ],
      },
    ],
  },
  {
    from: "You",
    type: "user",
    content: [{ text: ["Can I see your work?"] }],
  },
  {
    from: "Holiday",
    type: "me",
    content: [
      { text: ["Here's some of my featured work"] },
      {
        imgUrl:
          "https://framerusercontent.com/images/wzjlBE9JNivYyg8MQZ9Czjp0UOA.jpg?scale-down-to=1024&width=4000&height=2250",
        text: ["Brand refresh, typeface and collateral for a fintech startup"],
        route: {
          href: "/projects/first-project",
        },
      },
      {
        text: ["To see the rest of my work"],
        links: [
          {
            text: "Click here",
            href: "http://localhost:3000/projects",
          },
        ],
      },
    ],
  },
  {
    from: "You",
    type: "user",
    content: [{ text: ["Any reviews?"] }],
  },
  {
    from: "Holiday",
    type: "me",
    content: [
      {
        text: [
          "Sure! Here's what a few clients have said after working with me:",
        ],
      },
    ],
  },
  {
    from: "Charlie Smith, Omega CEO",
    avatar:
      "https://framerusercontent.com/images/tPYkIwImGTYNrIWUAK9mkYyUgw.jpg?scale-down-to=1024",
    type: "client",
    content: [
      {
        text: [
          "I never realized how much our old branding was holding us back until we worked with Holiday. The new visual identity he created is not beautiful, it is strategic and effective.",
        ],
      },
    ],
  },
  {
    from: "Holiday",
    type: "me",
    content: [
      {
        text: ["That was just a bit about my work. Want to see all reviews?"],
        links: [
          {
            text: "Click here",
            href: "http://localhost:3000/client-reviews",
          },
        ],
      },
    ],
  },
  {
    from: "You",
    type: "user",
    content: [{ text: ["Nice. Tell me more about you."] }],
  },
  {
    from: "Holiday",
    type: "me",
    content: [
      {
        text: ["Sure! I've been a frontend engineer for around 4 years"],
      },
      {
        text: [
          "I've been lucky enough to do frontend work for clients ranging from early stage startups to publicly listed enterprises.",
        ],
      },
      {
        text: ["This is me 😎", "Click the link below to know more"],
        imgUrl: "/me.jpg",
        links: [
          {
            text: "About me",
            href: "http://localhost:3000/about-me",
          },
        ],
      },
    ],
  },
  {
    from: "You",
    type: "user",
    content: [{ text: ["Where can I reach you?"] }],
  },
  {
    from: "Holiday",
    type: "me",
    content: [
      {
        text: [
          "I mostly use X and LinkedIn to communicate. If you’d like a face-to-face chat, book a slot in my calendar for a video call!",
        ],
        socials: [
          {
            text: "DM me on WhatsApp",
            href: "https://api.whatsapp.com/send?phone=2348128157510",
          },
          {
            text: "Send me a DM on 𝕏",
            href: "https://x.com/thelastofinusa",
          },
          {
            text: "Connect on LinkedIn",
            href: "https://linkedin.com/in/thelastofinusa",
          },
        ],
      },
      {
        text: [
          "You can also just leave me a message and I'll try to get back to you as soon as possible.",
        ],
        form: [
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

export const aboutMessages: MessageType[] = [
  {
    from: "Holiday",
    type: "me",
    content: [
      {
        text: ["My full name is Abdullahi Inusa Salihu."],
      },
      {
        text: [
          'Born in Kaduna, Nigeria and the last child of a family of 6. Which came about my username "@thelastofinusa"',
        ],
      },
    ],
  },
  {
    from: "You",
    type: "user",
    content: [{ text: ["Why did you name yourself Holiday?"] }],
  },
  {
    from: "Holiday",
    type: "me",
    content: [
      {
        text: [
          "I know it's weird and not supposed to be a name for a person 😂",
        ],
      },
      {
        text: [
          "I was just trying to be funny and I think it turned out a little bit weird. But few people are getting used to it now 🌚",
        ],
      },
      {
        text: [
          "Well, Holiday is an acronym of my personality traits and what I do",
        ],
      },
      {
        text: ["Humble Optimistic Learner Inspiring Dreams And Youths"],
      },
    ],
  },
  {
    from: "You",
    type: "user",
    content: [{ text: ["Do you have any work experience?"] }],
  },
  {
    from: "Holiday",
    type: "me",
    content: [
      {
        text: [
          "Yes, I'm currently working as an in-house developer at GADA Studios",
        ],
      },
      {
        imgUrl: "/gada-studios.png",
        text: [
          "GADA Studios is a branding and design agency tha specializes in branding, design and development services for startups and small businesses.",
        ],
      },
      {
        text: [
          "I started working at GADA Studios early 2021. My role is to build and maintain the websites for clients.",
        ],
      },
      {
        links: [
          {
            text: "Official Website",
            href: "https://wearegada.com",
            newTab: true,
          },
        ],
      },
    ],
  },
];

export const workMessages: MessageType[] = [
  {
    from: "Holiday",
    type: "me",
    content: [
      {
        text: ["Here are all the list of projects I've worked on so far:"],
      },
      {
        imgUrl: "/gada-studios.png",
        text: [
          "GADA Studios is a branding agency that specializes in branding and design services.",
        ],
        route: {
          href: "http://localhost:3000/projects/gada-studios",
        },
      },
    ],
  },
];

export const reviewsMessages: MessageType[] = [
  {
    from: "Holiday",
    type: "me",
    content: [
      {
        text: ["Here are all the reviews I've received so far:"],
      },
    ],
  },
  {
    from: "Charlie Smith, Omega CEO",
    avatar:
      "https://framerusercontent.com/images/tPYkIwImGTYNrIWUAK9mkYyUgw.jpg?scale-down-to=1024",
    type: "client",
    content: [
      {
        text: [
          "I never realized how much our old branding was holding us back until we worked with Holiday. The new visual identity he created is not beautiful, it is strategic and effective.",
        ],
      },
    ],
  },
];

export const contactMessages: MessageType[] = [
  {
    from: "Holiday",
    type: "me",
    content: [
      {
        text: [
          "I mostly use X and LinkedIn to communicate. If you’d like a face-to-face chat, book a slot in my calendar for a video call!",
        ],
        socials: [
          {
            text: "DM me on WhatsApp",
            href: "https://api.whatsapp.com/send?phone=2348128157510",
          },
          {
            text: "Send me a DM on 𝕏",
            href: "https://x.com/thelastofinusa",
          },
          {
            text: "Connect on LinkedIn",
            href: "https://linkedin.com/in/thelastofinusa",
          },
        ],
      },
      {
        text: [
          "You can also just leave me a message and I'll try to get back to you as soon as possible.",
        ],
        form: [
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
  {
    from: "You",
    type: "user",
    content: [
      {
        text: ["Thanks"],
      },
    ],
  },
  {
    from: "Holiday",
    type: "me",
    content: [
      {
        text: ["The pleasure is all mine 😁"],
      },
      {
        text: ["Feel free to reachout.."],
      },
    ],
  },
];
