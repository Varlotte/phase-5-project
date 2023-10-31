//static page linking to sources
import React, { useEffect, useState, createContext } from "react";

function Resources() {
  return (
    <div>
      <h1>Resources</h1>{" "}
      <p>
        {" "}
        Note: RXMatch is not a diagnostic tool. Only a professional can diagnose
        you. Please discuss all medications seen on RXGnosis with your provider.
        Not all medications have the same side effects for all people. For more
        medication information, please visit{" "}
        <a href="http://www.medlineplus.gov" target="_blank">
          www.medlineplus.gov
        </a>
        . From there, you can search for medications in greater detail.
      </p>
      <p>
        All information available on RXMatch was made available through Medline
        Plus, a free public health information resource for patients and
        providers from the National Library of Medicine, a subsidiary of the
        National Institutes of Health.
      </p>
      <p>
        Please do not attempt to diagnose yourself, or prescribe yourself with
        unreliable tools like WebMD, which are not peer reviewed, and really
        just exist to make patients feel scared.
      </p>
      <p>
        The National Library of medicine also has a ton of cool free APIs for
        developers, which you can find at
        <a href="https://www.lhncbc.nlm.nih.gov/RxNav/APIs/" target="_blank">
          their website.
        </a>
      </p>
    </div>
  );
}

export default Resources;
