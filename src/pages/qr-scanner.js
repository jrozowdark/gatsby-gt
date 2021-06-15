import React, {useState, useEffect} from 'react';
import Scanner from "../components/Scanner";
import Layout from "../components/layout";
import SEO from "../components/seo";
export default function App(){

  const [a,setA] = useState();
  const [isIE, setIsIE] = useState(false);
  useEffect(() => {
    setA(<Scanner/>)
  },[]);


  return (
    <Layout>
      <SEO title="Qr Scanner" />
      {a}
    </Layout>
  );
}
