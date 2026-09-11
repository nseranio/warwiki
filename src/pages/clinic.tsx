import React from 'react';
import Layout from '@theme/Layout';
import ClinicQuickAccess from '@site/src/components/ClinicQuickAccess';

export default function Clinic(): React.ReactElement {
  return <Layout title="Clinic quick access" description="Direct routes to assessment, treatment options and follow-up for common functional urology problems.">
    <main className="container margin-top--lg margin-bottom--xl" style={{maxWidth: 1100}}>
      <h1>Clinic quick access</h1>
      <p>Start with a common problem, then open its assessment and treatment resources. Each article records the scope of its evidence update where available.</p>
      <ClinicQuickAccess />
    </main>
  </Layout>;
}
