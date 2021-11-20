// This is my home / my landing page

import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import classical from '../public/images/classical.jpeg';
import cleveland from '../public/images/cleveland.jpeg';

const img = css`
  max-width: 100%;
  min-height: 500px;
  max-height: 800px;
  height: auto;
`;

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Pair Up! - Home</title>
      </Head>
      <div class="row">
        <div class="column">
          <Image
            css={img}
            src={cleveland}
            alt="dancing couple in downtown cleveland"
          />
        </div>
        <div class="column">
          Welcome to PairUp! We are delighted to see you here! Let's pull up our
          sleeves and get you paired up!
          <br /> <br />
          Here are some shockingly bad dance-related puns for you to enjoy:
          <br /> <br />
          If you happen to see cars dancing at the disco, it is probably a brake
          dance.
          <br /> <br />
          The skeletons didn’t get the opportunity to dance at the party because
          they had no body to dance with.
          <br /> <br />
          It is not always that you wait for the storm in your life to pass but
          learning how to dance in the rain. The best place for a dance in
          California is San Fran-disco.
          <br /> <br />
          The astronauts love this one dance move, the moonwalk.
          <br /> <br />
          When going out for a dance, snails wear escargogo boots.
          <br /> <br />
          If you have been wondering why ants dance when climbing jam jars is
          because most jars say twist to open.
          <br /> <br />
          When the summer is over, women love dancing to tan-go.
          <br /> <br />
          Swine Lake is arguably the most favorite of a pig’s ballet.
        </div>
        <div class="column">
          <Image
            className="image"
            src={classical}
            alt="classical dancing couple"
          />
        </div>
      </div>
    </Layout>
  );
}
