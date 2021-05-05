import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import fetch from "node-fetch";
import ShopContextProvider from "../context/shopcontext";
import Header from "../components/header";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: "http://localhost:10013/graphql",
    cache: new InMemoryCache(),
    fetch: fetch
  });
  return (
    <ApolloProvider client={client}>
      <ShopContextProvider>
        <Header />
        <Component {...pageProps} />
      </ShopContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
