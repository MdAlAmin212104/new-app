import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {authenticate} from '../shopify.server'



export async function loader({request}){
    const { admin } = await authenticate.admin(request);

    const response = await admin.graphql(
  `#graphql
  query GetProducts {
    products(first: 10) {
      nodes {
        id
        title
      }
    }
  }`,
);

const data = await response.json();
    return json(data);

}
const Text = () => {
    const textData = useLoaderData();
    console.log("text-date -----------------------", textData);
    return (
        <div>
            <h1>This is text data</h1>
            <p>Name: {textData.name}</p>
            <p>Description: {textData.description}</p>
        </div>
    );
};

export default Text;