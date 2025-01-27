# Blockhouse Interview

## Getting Started

> [!IMPORTANT]
> If you don't use bun, you can use yarn or npm instead.
>
> A yarn lockfile is also included, so use what suits you best.
>
> The node version is also managed by mise, check the config to see what version is required.

```bash
bun install
```

```bash
bun start
```

This will open up the app in expo go on your simulator.

We are not using CNG since that would add more complexity for the setup process. Instead we are using Expo Go, for a blazing fast setup.

> [!NOTE]
> Yes, I know Expo Go is not recommended, but considering this project, it is a great fit. Unless we were actually adding in native code, Expo Go is the easiest way to test the app.
>
> But, if you want to test the app using CNG, by all means go ahead by running `bun ios`

## Overview

This app was bootstrapped with expo using the react navigation template as requested.

Authentication is handled using react context to create an auth provider, and is persisted using expo-sqlite/kv.

> [!NOTE]
> I'm not using async storage because it is slow garbage.
>
> I would usually use mmkv, but I wanted this to support expo go for easy testing, so I used expo-sqlite/kv.

> [!IMPORTANT]
> The auth setup is VERY basic and signin does not work because it is impossible to do without a backend. I did the most basic auth setup I could to meet the requirements with the limitations.

React navigation is used for the navigation, and is setup as according to their docs and the initial template.

> [!NOTE]
> I'm not a fan of react navigation, I strongly prefer Expo Router because file based declarative navigation is just better than imperative navigation.
>
> Expo Router also add's a ton of other features on top of react navigation, like rsc's layout routes, and it's fully cross platform.
>
> But, because of the constraints of the interview, I'm using react navigation.

## CI/CD

I added a github action that runs on every push to the master branch, that runs automated linting and typechecking.

I also added a github action that runs on every push to the master branch, that builds the app using EAS.

> [!NOTE]
> For the build workflow to work, you need to create a project on EAS and add the `EXPO_TOKEN` to the repo secrets.

> [!IMPORTANT]
> This setup of the workflows, is not the best way in my opinion, but because it was requested to be done in the interview, I did it this way.
>
> It would be better to run required ci checks on each pr, these ci checks would be much more through than the ones I've setup here.
>
> Then another workflow would be setup to run on push to master to do a branch healthcheck, to make sure the master branch is healthy.
>
> Lastly, builds would be done entirely on EAS using their github integration, this would be way more efficient and faster.

## Conclusion

I've done my best to address all the requirements of the interview, and I've documented my thought process and decisions in this README.

Overall, although I've meet the requirements, I'm not happy with the setup since, it could be much better.

The navigation could be more secure (authwalled routes), it could be simpler, and it could handle splash screens better. All of this would've been easy to do with expo router.

The auth setup is VERY basic, I can't stress this enough. Without a backend, it is impossible to do email pass authentication. If I was able to use a backend, I would've threw in supabase auth, or clerk auth for an actual auth setup.

If I did't want to support Expo Go, I would've used react native mmkv, for a blazing fast kv storage.

I would've also used nativewind for styling, because tailwind is the best way to style period. (in my opinion 😜)

I would've also made a bunch of more optimizations, like using the react compiler, expo's tree shaking, and a bunch of other stuff.

This code does not represent my best work, not by a long shot.
Feel free to look through my github to see my other work, to see how I usually do things, especially [Exponent](https://github.com/kabankz/exponent). That's my go to expo template that I made myself that contains a ton of optimizations and best practices. I constantly update it with the latest and greatest expo features. It use it constantly as a reference for best practices in react native, along with other packages that I've setup on it like eslint, prettier, github actions, and more.

If you want to see an even more advanced expo app I've made, reach out to me and I'll show you how I do react native monorepos, using pnpm, expo, supabase auth, supabase db, drizzle, trpc, and more.
