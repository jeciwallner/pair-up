import { createUser, getUsers } from '../../../util/database';

export default function user(props) {}

export async function getServerSideProps(context) {
  // return { props: {} };
  const { getStyles } = await import('../../util/database');

  const users = await getStyles();

  export async function handler(req, res) {
    if (req.method === 'GET') {
      const users = await getUsers();
      return res.status(200).json(styles);
    } else if (req.method === 'POST') {
      const body = req.body;
      const createdUser = await createUser({
        name: body.userName,
        styles: body.userStyles,
      });

      return res.status(200).json(createdUser);
    }

    return res.status(405);
  }
}
