// This is my home / my landing page

import Head from 'next/head';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Pair Up! - Home</title>
      </Head>
      <div class="container my-5 ">
        <div class="row">
          <div class="col-sm-3">
            <img
              src="/images/cleveland.jpeg"
              alt="dancing couple in downtown cleveland"
              class="w-100"
            />
          </div>
          <div class="col-sm-6 my-3 my-sm-0">
            <h1 class="h3">Welcome to PairUp!</h1>
            <p>
              We are delighted to see you here! Let's pull up our sleeves and
              get you paired up!
            </p>
            <p>
              Here are some shockingly bad dance-related puns for you to enjoy:
            </p>
            <p>
              If you happen to see cars dancing at the disco, it is probably a
              brake dance.
            </p>
            <p>
              The skeletons didn’t get the opportunity to dance at the party
              because they had no body to dance with.
            </p>
            <p>
              It is not always that you wait for the storm in your life to pass
              but learning how to dance in the rain. The best place for a dance
              in California is San Fran-disco.
            </p>
            <p>When going out for a dance, snails wear escargogo boots.</p>
            <p>
              If you have been wondering why ants dance when climbing jam jars
              is because most jars say twist to open.
            </p>
          </div>
          <div class="col-sm-3">
            <img
              class="w-100"
              src="/images/classical.jpeg"
              alt="classical dancing couple"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
