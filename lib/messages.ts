import { MessageType } from "./types";

// export const homeMessages: Array<MessageType> = [
//   {
//     sender: {
//       from: "holiday",
//       name: "Holiday",
//       avatar: "/images/holiday.jpg",
//     },
//     content: [
//       { message: "Hey there 👋" },
//       { message: "I see you've arrived here.." },
//     ],
//   },
//   {
//     sender: {
//       from: "anonymous",
//       name: "Anonymous",
//     },
//     content: [{ message: "Your portfolio is giving iMessage vibes" }],
//   },
//   {
//     sender: {
//       from: "holiday",
//       name: "Holiday",
//       avatar: "/images/holiday.jpg",
//     },
//     content: [
//       {
//         message: "Appreciate it.",
//       },
//       {
//         message: "I got the inspiration from this site",
//       },
//       {
//         link: {
//           title: "Messenger",
//           image:
//             "https://framerusercontent.com/images/1hCvuJbJc7kBO5ANU367V1u2kM.jpg",
//           description:
//             "Messenger is a personal website template made for Framer. It features an interactive conversational style designed for creatives to show their work and experience, as well as featuring other types of content.",
//           // url: "https://messenger.framer.website/home-static",
//           url: "https://tailwindcss.com",
//         },
//       },
//     ],
//   },
//   {
//     sender: {
//       from: "anonymous",
//       name: "Anonymous",
//     },
//     content: [
//       {
//         message: "What project have you workedon?",
//       },
//     ],
//   },
//   {
//     sender: {
//       from: "holiday",
//       name: "Holiday",
//       avatar: "/images/holiday.jpg",
//     },
//     content: [
//       {
//         message: "Here are some of my featured work",
//       },
//       {
//         project: {
//           title: "dApp/ui",
//           description:
//             "The Production-ready Web3 components for seamless blockchain interactions across multiple networks.",
//           featured: true,
//           slug: "dapp-ui",
//           createdAt: "16 October, 2024",
//         },
//       },
//       {
//         project: {
//           title: "GADA Studios",
//           description:
//             "A branding agency that specializes in branding and design services.",
//           featured: true,
//           slug: "gada-studios",
//           createdAt: "04 October, 2020",
//         },
//       },
//       {
//         message: "Check out all my projects",
//         route: {
//           path: "/projects",
//         },
//       },
//     ],
//   },
//   {
//     sender: {
//       from: "anonymous",
//       name: "Anonymous",
//     },
//     content: [
//       {
//         message: "Any reviews?",
//       },
//     ],
//   },
//   {
//     sender: {
//       from: "holiday",
//       name: "Holiday",
//       avatar: "/images/holiday.jpg",
//     },
//     content: [
//       {
//         message:
//           "Yeah, I have a lot of reviews from clients I've worked with over the years",
//       },
//       {
//         message: "You can check them out here.",
//         route: {
//           path: "/reviews",
//         },
//       },
//     ],
//   },
//   {
//     sender: {
//       from: "anonymous",
//       name: "Anonymous",
//     },
//     content: [
//       {
//         message: "How do I reach out?",
//       },
//     ],
//   },
//   {
//     sender: {
//       from: "holiday",
//       name: "Holiday",
//       avatar: "/images/holiday.jpg",
//     },
//     content: [
//       {
//         message:
//           "I mostly use X and LinkedIn to communicate. If you'd like a face-to-face chat, book a slot in my calendar for a video call!",
//         buttons: [
//           {
//             label: "DM me on WhatsApp",
//             url: "https://api.whatsapp.com/send?phone=2348128157510",
//             newTab: true,
//           },
//           {
//             label: "Send me a DM on 𝕏",
//             url: "https://x.com/thelastofinusa",
//             newTab: true,
//           },
//           {
//             label: "Connect on LinkedIn",
//             url: "https://linkedin.com/in/thelastofinusa",
//             newTab: true,
//           },
//         ],
//       },
//       {
//         message:
//           "You can also just leave me a message and I'll try to get back to you as soon as possible.",
//         fields: [
//           {
//             field: "input",
//             type: "text",
//             name: "name",
//             placeholder: "John Doe",
//             error: "I need your name to continue.",
//           },
//           {
//             field: "input",
//             type: "email",
//             name: "email",
//             placeholder: "johndoe@gmail.com",
//             error: "Share your email so I can reach you.",
//           },
//           {
//             field: "textarea",
//             name: "message",
//             placeholder: "Enter your message",
//             error: "Tell me what you want to say.",
//           },
//         ],
//       },
//     ],
//   },
// ];

// export const projectsMessages: Array<MessageType> = [
//   {
//     sender: {
//       from: "holiday",
//       name: "Holiday",
//       avatar: "/images/holiday.jpg",
//     },
//     content: [
//       {
//         message: "These are all my projects",
//       },
//       {
//         project: {
//           title: "dApp/ui",
//           description:
//             "The Production-ready Web3 components for seamless blockchain interactions across multiple networks.",
//           featured: true,
//           slug: "dapp-ui",
//           createdAt: "16 October, 2024",
//         },
//       },
//       {
//         project: {
//           title: "GADA Studios",
//           description:
//             "A branding agency that specializes in branding and design services.",
//           featured: true,
//           slug: "gada-studios",
//           createdAt: "04 October, 2020",
//         },
//       },
//     ],
//   },
// ];

export const gadaMessages: Array<MessageType> = [
  {
    sender: {
      from: "holiday",
      name: "Holiday",
      avatar: "/images/holiday.jpg",
    },
    content: [
      { message: "Small confession." },
      { message: "This is a static message ‼️" },
      { message: "The project details page is currently under construction." },
    ],
  },
  {
    sender: {
      from: "anonymous",
      name: "Anonymous",
    },
    content: [{ message: "You left me hanging again." }],
  },
  {
    sender: {
      from: "holiday",
      name: "Holiday",
      avatar: "/images/holiday.jpg",
    },
    content: [
      { message: "I owe you that one." },
      { message: "I am updating the page and pushing it closer to release." },
    ],
  },
  {
    sender: {
      from: "anonymous",
      name: "Anonymous",
    },
    content: [{ message: "What tripped you up this time?" }],
  },
  {
    sender: {
      from: "holiday",
      name: "Holiday",
      avatar: "/images/holiday.jpg",
    },
    content: [
      { message: "The structure for the page was not prepared earlier." },
      { message: "The dynamic fields asked for more work than planned." },
      { message: "All good. I am sorting it out." },
    ],
  },
  {
    sender: {
      from: "anonymous",
      name: "Anonymous",
    },
    content: [{ message: "Oh, cool." }],
  },
  {
    sender: {
      from: "holiday",
      name: "Holiday",
      avatar: "/images/holiday.jpg",
    },
    content: [
      {
        message:
          "Yeah. In the meantime, check out this cool video I found on YouTube.",
        route: {
          path: "https://youtu.be/IAYhEkVtNuQ?si=yR6s8VHY8mF8WEqP",
          newTab: true,
        },
      },
    ],
  },
];
