import {Page, Layout, Card} from '@shopify/polaris';
import { authenticate } from '../shopify.server';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';


export async function loader({request}) {
  // provides data to the component
  const { admin } = await authenticate.admin(request);

const response = await admin.graphql(
  `#graphql
  query {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
          updatedAt
        }
      }
    }
  }`,
);

const jsonData = await response.json();
const allCollections = jsonData.data.collections.edges; // ✅✅✅

return allCollections;

}


export default function LayoutExample() {
    const allCollections = useLoaderData();
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
            {
  allCollections.map((collection) => {
    const c = collection.node;
    return (
      <Card title={c.title} sectioned key={c.id}>
        <p>Collection handle: {c.handle}</p>
      </Card>
    );
  })
}

          
        </Layout.Section>
      </Layout>
    </Page>
  );
}