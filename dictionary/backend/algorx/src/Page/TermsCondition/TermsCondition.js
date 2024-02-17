import "./TermsCondition.css";
import React from "react";
import { Row, Col } from "react-bootstrap";
import SideDrawer from "../SideDrawer/SideDrawer";
import Header from "../Header/Header";

// tearms and condition page
const TermsCondition = () => {
  return (
    <>
      <div className="chatscreen admindashboard">
        <Row>
          <Col lg={2}>
            <SideDrawer />
          </Col>
          <Col lg={10}>
            <Header />
            <div className="termsandconditions">
              <span>AGREEMENT</span>
              <h4>Terms & Condition</h4>
              <p>
                Welcome to FRENCHIE M.D. This Terms of Service Agreement
                ("Agreement") is a legal agreement between you ("User") and our
                platform ("Operator"). By using our platform, you agree to be
                bound by this Agreement. If you do not agree to be bound by this
                Agreement, please refrain from using our platform.
              </p>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Who are we?
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  FRENCHIE M.D Pty Ltd trading as Frenchie M.D. ABN: 78 664 190
                  407 Level 1, 2 Short Street, Double Bay NSW 2028
                </p>
                <p>
                  Frenchie M.D is a pleasure-inclusive sexual health platform
                  that facilitates online, discreet, judgment free and
                  confidential consults with third party doctors (Doctors)
                </p>
                <p>
                  {" "}
                  Our website content and any communications you have with our
                  representatives (other than our representatives who are
                  Doctors) do not constitute medical advice. You should always
                  seek medical advice from a doctor or your regular doctor to
                  ensure any particular medication or treatment is suitable and
                  safe for you.
                </p>
              </div>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Scope of Services
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  Our platform provides telehealth/telemedicine services that
                  allow Users to access healthcare services remotely via
                  quiz/question based consults, online chat and occasional
                  video, phone, and other means of communication if required.
                  The healthcare services provided by our platform are provided
                  by healthcare professionals and pharmacies who are licensed to
                  practice medicine, provide healthcare services and dispense
                  medication in their respective jurisdictions.Independent
                  Practitioners and Pharmacies who may connect with users via
                  the website have separate agreements with us which govern
                  their use of the website and their respective relationships
                  with us.
                </p>
              </div>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Use of Platform
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  Users must be at least 18 years of age to use our platform.
                  Users may only use our platform for lawful purposes and in
                  accordance with this Agreement. Users may not use our platform
                  to transmit or disseminate any illegal, harmful, offensive, or
                  otherwise objectionable material. Users are solely responsible
                  for ensuring that their use of our platform complies with all
                  applicable laws, rules, and regulations.
                </p>
              </div>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Privacy
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  Our platform takes the privacy of its Users seriously. We
                  collect and process User data in accordance with our Privacy
                  Policy, which can also be found on our website. By using our
                  platform, Users consent to the collection and processing of
                  their personal information in accordance with our Privacy
                  Policy.
                </p>
              </div>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Consent to communications{" "}
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  By using our platform, Users consent to receiving
                  communications from our platform, including emails, text
                  messages, and push notifications. These communications may
                  include, but are not limited to, appointment reminders,
                  updates about the User's healthcare services, and promotional
                  messages. All sensitive information will only be shared within
                  the platform but a communication by text or email will notify
                  the user to check the platform for an update.
                </p>
              </div>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Purchases and payment
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  Users may be charged for the healthcare services they receive
                  through our platform. Users are responsible for ensuring that
                  they have a valid payment method on file with our platform.
                </p>
                <p>Pricing comprises of amounts we collect and pass onto:</p>
                <p>
                  Doctors as a service we provide to the Doctor (where the
                  doctor is using the Operators platform to provide telehealth
                  services direct to his or her patients); and Pathology
                  Providers, as a service we provide to the user and doctor
                  pathology services together and the fees are included in the
                  quoted consultation fees and paid by the Operator to the
                  pathology provider on behalf of the user. Pharmacies, as a
                  service we provide to users, (together, Pass Through Amounts);
                  and the balance, which covers everything else the Operator
                  offers within your subscription including non-prescription
                  products and access to consultations with and advice from
                  Doctors and registered nurses (Our Fees).
                </p>
                <p>
                  Our website refers to the aggregate of each user's
                  Pass-Through Amounts and Our Fees as the user's subscription
                  fee.
                </p>
              </div>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Subscription Charges
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  The platform offers products and services that can be
                  purchased on an automatically renewing subscription basis. For
                  subscription-based products and services, your payment will be
                  billed at regular intervals, as described during the checkout
                  process, until your treatment plan is complete or your
                  treatment plan is canceled. All prices listed are inclusive of
                  GST and shipping costs where relevant.
                </p>
              </div>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Transactions and payment processing{" "}
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  Our platform Novatti Group Limited ("Novatti") for payment
                  processing. By using our platform, Users agree to be bound by
                  Novatti's Terms of Service, which can be found on their
                  website. Users are solely responsible for ensuring that their
                  payment information is accurate and up to date. In the event
                  of any payment disputes, Users should contact our platform's
                  customer service team for assistance.
                </p>
              </div>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Non-prescription products and Shopify
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  Our platform may use Shopify, Inc ("Shopify") to process
                  transactions for non-prescription products. By using our
                  platform, Users agree to be bound by Shopify's Terms of
                  Service, which can be found on their website. Users are solely
                  responsible for ensuring that they are authorized to purchase
                  non-prescription products in their jurisdiction. Our platform
                  makes no representations or warranties regarding the quality
                  or safety of non-prescription products sold through our
                  platform. Users should consult with a healthcare professional
                  before using any non-prescription products purchased through
                  our platform.
                </p>
              </div>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Licensed healthcare providers
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  Healthcare services provided through our platform are provided
                  by licensed third party healthcare providers (Doctors),
                  including licensed doctors and licensed pharmacists and
                  pharmacy. Users understand and acknowledge that the healthcare
                  services provided through our platform are not a substitute
                  for in-person medical advice, diagnosis, or treatment. Users
                  should consult with their healthcare provider or seek
                  emergency medical attention if they have any questions or
                  concerns about their health.
                </p>
              </div>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Licensed pharmacy dispensing
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  Prescription fulfillment and dispensing is provided by
                  independent pharmacies. They may from time to time contact you
                  to provide more information relating to a prescription
                  provided by the Doctor.
                </p>
              </div>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Disclaimers
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  Our platform makes no representations or warranties of any
                  kind, express or implied, as to the operation of our platform
                  or the information, content, materials, or products included
                  on our platform. To the fullest extent permissible by
                  applicable law, our platform disclaims all warranties, express
                  or implied, including, but not limited to, implied warranties
                  of merchantability and fitness for a particular purpose.
                </p>
              </div>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Limitation of Liability
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  To the extent permissible under Australian law, our platform
                  and its affiliates, officers, directors, employees, agents,
                  licensors, and service providers shall not be liable for any
                  damages whatsoever, including, but not limited to, direct,
                  indirect, incidental, consequential, or punitive damages
                  arising out of or related to the use of our platform, the
                  healthcare services provided through our platform, or any
                  information, content, materials, or products included on our
                  platform.
                </p>
              </div>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Indemnification
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  Users agree to indemnify and hold harmless our platform and
                  its affiliates, officers, directors, employees, agents,
                  licensors, and service providers from any claims, liabilities,
                  damages, and expenses (including reasonable legal fees)
                  arising out of or related to the User's use of our platform,
                  the healthcare services provided through our platform, or any
                  breach of this Agreement.
                </p>
              </div>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Governing Law and Jurisdiction
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  This Agreement shall be governed by and construed in
                  accordance with the laws of New South Wales. Users agree that
                  any dispute arising out of or related to this Agreement or the
                  use of our platform shall be resolved exclusively in the
                  courts located in New South Wales.{" "}
                </p>
              </div>
              <ul className="points fw-bold">
                <li className="fw-bold fs-5">
                  <span></span>Modifications to Agreement
                </li>
              </ul>
              <div className="ms-4">
                <p>
                  Our platform reserves the right to modify this Agreement at
                  any time by posting the modified Agreement on our website.
                  Users are responsible for regularly reviewing the Agreement
                  and should be aware of any changes. The continued use of our
                  platform after any modifications to this Agreement shall
                  constitute the User's consent to such modifications.
                </p>
              </div>
            </div>
            {/* <div className="copyright">
              <p>©2023 Frenchie M.D Pty Ltd</p>
            </div> */}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TermsCondition;
