import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Text,
  Section,
  Row,
  Button,
} from '@react-email/components';
import { Verification } from 'next/dist/lib/metadata/types/metadata-types';
import { Resend } from 'resend';

import * as React from "react";
interface VerificationEmailProps {
  username: string;
  otp: string;
}
export default function VerificationEmail({username,otp}: VerificationEmailProps) {
  return (
    <Html>
      <Head>
        <title>Verification Email</title>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
          body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
          }
        `}</style>
        </Head>
        <Preview>Here&apos;s your verification code:{otp}</Preview>
      
        <Section>
          <Row>
            <Heading>Welcome {username}!</Heading>
            <Text>Here&apos;s your verification code:{otp}</Text>
          </Row>
          <Button href="http://localhost:3000/verify/${username}">
            Verify here
          </Button>
        </Section>
    </Html>
  );
}