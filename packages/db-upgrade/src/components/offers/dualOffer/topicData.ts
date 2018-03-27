export type Feature = {
  name: string;
  inPro?: boolean;
  inStarter?: boolean;
  textPro?: string;
  textStarter?: string;
};

type Topic = {
  name: string;
  features: Array<Feature>;
};

const topicData: {[topic: string]: Topic} = {
  account: {
    name: 'Accounts',
    features: [
      {
        name: 'Unlimited shows',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Unlimited episodes',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Unlimited bandwidth',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Unlimited Storage',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Episode file size',
        textStarter: '64MB',
        textPro: '256MB',
      },
      {
        name: 'Upload surge (every 30d)',
        textStarter: 'Extra 64MB',
        textPro: 'Extra 256MB',
      },
    ],
  },
  analytics: {
    name: 'Analytics',
    features: [
      {
        name: 'Subscriber analytics',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Listen analytics',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Listen by episode',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Listen by agent',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Listen by OS',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Listen growth',
        inStarter: false,
        inPro: true,
      },
      {
        name: 'Geographic listen analytics',
        inStarter: false,
        inPro: true,
      },
      {
        name: 'Geographic subscription analytics',
        inStarter: false,
        inPro: true,
      },
      {
        name: 'Top episode breakdown',
        inStarter: false,
        inPro: true,
      },
      {
        name: 'Top city breakdown',
        inStarter: false,
        inPro: true,
      },
    ],
  },
  podcasts: {
    name: 'Podcasts',
    features: [
      {
        name: 'RSS feed for each podcast',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Embeddable player for each episode',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Slack, webhooks, email notifications',
        inStarter: false,
        inPro: true,
      },
    ],
  },
  podcastWebsite: {
    name: 'Sites',
    features: [
      {
        name: 'Site updates with published episodes',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Customizable themes',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Use your own domain',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Google Analytics support',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Customize the favicon',
        inStarter: false,
        inPro: true,
      },
    ],
  },
  collaboration: {
    name: 'Collaboration',
    features: [
      {
        name: 'Invite other users to your podcast dashboard',
        inStarter: false,
        inPro: true,
      },
      {
        name: 'Group podcasts into networks',
        inStarter: false,
        inPro: true,
      },
      {
        name: 'Network count',
        inStarter: false,
        textPro: 'Unlimited',
      },
    ],
  },
  tipJar: {
    name: 'Tip jars',
    features: [
      {
        name: 'Maximum tip amount',
        textStarter: '$20 USD',
        textPro: '$50 USD',
      },
      {
        name: 'Convenience fee',
        textStarter: '$0',
        textPro: '$0',
      },
      {
        name: 'One-time and recurring tips',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Customize tip jar messaging',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Make episodes private to recurring tippers only',
        inStarter: true,
        inPro: true,
      },
      {
        name: 'Set a minimum tip amount for private content',
        inStarter: false,
        inPro: true,
      },
      {
        name: 'Schedule episodes to automatically become private',
        inStarter: false,
        inPro: true,
      },
    ],
  },
};

export default topicData;

export type Topics = keyof typeof topicData;
