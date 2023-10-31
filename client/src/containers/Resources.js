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
        medication information, including more detailed and updated side
        effects, please visit{" "}
        <a href="http://www.medlineplus.gov" target="_blank">
          www.medlineplus.gov
        </a>
        . From there, you can search for medications, conditions, and treatments
        in greater detail.
      </p>
      <p>
        All information available on RXMatch was made available through Medline
        Plus, a free public health information resource for patients and
        providers from the National Library of Medicine, a subsidiary of the
        National Institutes of Health.
      </p>
      <p>
        Reliable public health information is out there- RXGnosis recommends
        using tools from the NLM, NIH, and FDA. Don't use WebMd!
      </p>
      <p>
        Are you a developer looking for free public health databases? Check out{" "}
        <a href="https://www.lhncbc.nlm.nih.gov/RxNav/APIs/" target="_blank">
          the National Library of Medicine's public APIs.
        </a>
      </p>
    </div>
  );
}

export default Resources;
