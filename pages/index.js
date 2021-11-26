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
              In Vienna, numerous dance schools offer a vast variety of classes,
              and every year, a multitude of balls, happenings and regular
              gatherings are being put on. Whosoever desires, can cavort and
              thoroughly let their hair down.
            </p>
            <p>
              If said cavorter happens, however, to not find themselves in a
              relationship, or with a partner not willing to join in their
              frolicking, one is often reduced to the sad alternative of, well,
              just staying home. Sad, isn't it?
            </p>
            <p>
              Pair Up! aims to connect all these sad people who have a passion
              for dancing, but nobody they can boogie with. Now there's good
              news!
            </p>
            <p>
              We are here to help! Let's pull up our sleeves and get you paired
              up!
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
