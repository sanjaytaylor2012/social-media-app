This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


# Instagram Clone

Check out the site at: https://social-media-app-two-teal.vercel.app/
Log in with:

username: test@gmail.com
password: test123

for a look at an already setup profile!

Note: this site is not optimized for mobile yet, so it will not look right on a phone.
Also, this is still in development and will have some bugs.

## Table of Contents
- [Inspiration](#inspiration)
- [How I built it](#how-we-built-it)
- [Challenges](#challenges)
- [Accomplishments](#accomplishments)

---

## Inspiration
Since coming to college, I have been more disconnected from my family than ever. To add to this, my parents do not use any forms of social media because of the privacy concerns that come with large tech companies. Thus, I created my own social media platform so that I could remain connected with my parents. The reason I chose to style this like Instagram was as to challenge my web design prowess. The nuance to get the site to look as close to Instagram as possible took a lot of fine-tuning.

## What is the Instagram Clone?
This is an (almost) full featured Instagram clone that I built on my own, from scratch. Some of its features include post creation and management, account management, post commenting, post liking, and more. Also, there the site is very responsive with different views for mobile and desktop which leads to a responsive feel and usability from any kind of device.

## How we built it
The frontend of the site was created with Next.js, a React.js metaframework. I utilized Chakra UI to build out the CSS of the site and provide styling. Recoil.js was used for a global state management. Also, the whole thing was written in Typescript. The frontend is deployed with Vercel. The backend is provided through Google Firebase. I utilized Firebase Auth for secure user authenticaion, Firebase Firestore (a non-relational database) for storage of post, comment, and user objects. Firebase Storage was used for image storage. I implemented Cloud Functions to provide some advanced backend functionality such as storing user objects apart from the Firebase Auth user objects.

## Challenges
The biggest challenge I faced was the implementation of Firebase Firestore. I had never implemented a database into an application before and as Firestore allows for a lot of freedom in how data is structured, structuring the data in an efficient and optimal layout was hard. Each user needs access to lots of data such as who they follow, who is following them, posts they have liked, likes on their posts, as well as the entirety of the commenting system for each post. In the end, I got a database model with a very hierarchical structure storing user objects at a high level, which store posts, a bio, username, email, profile picture as well as users they are following and the users following them. Each post object has its own information such as the caption, image, number of likes, post creation date, comment objects and more. Each comment object contains the name of the commenter, their profile picture, as well as their comment.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
