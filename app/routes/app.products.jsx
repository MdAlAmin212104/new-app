import { Page, Layout, Card } from '@shopify/polaris';
import { authenticate } from '../shopify.server';
import { useLoaderData } from '@remix-run/react';

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(`
    #graphql
    query GetProducts {
      products(first: 30) {
        nodes {
          id
          title
        }
      }
    }
  `);

  const data = await response.json();
  return data.data.products.nodes;
}

export default function LayoutExample() {
  const allproducts = useLoaderData();
  console.log(allproducts, "this is all products");

  return (
    <Page fullWidth>
      <Layout>
        {
          allproducts.map((product) => (
            <Card key={product.id} title={product.title} sectioned>
              <p>Product title: {product.title}</p>
            </Card>
          ))
        }
      </Layout>
    </Page>
  );
}
