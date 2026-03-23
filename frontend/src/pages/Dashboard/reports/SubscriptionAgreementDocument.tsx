import type { TSubscriptionAgreement } from '../../../shared/types/reports/subscription-agreement.type.ts'
import { Document, Page, View, Text } from '@react-pdf/renderer'
import { subscriptionAgreementStyles } from './reports.data.ts'
import { Table, TD, TH, TR } from '@ag-media/react-pdf-table'
import { dateFormater } from '../../../lib/date-formater.ts'

interface Props {
  data: TSubscriptionAgreement
}

const SubscriptionAgreementDocument = ({ data }: Props) => {
  const { email, startDate, endDate, type } = data

  return (
    <Document>
      <Page size={'A4'} style={subscriptionAgreementStyles.page}>
        <View style={subscriptionAgreementStyles.section}>
          <Text style={subscriptionAgreementStyles.title}>
            Subscription agreement
          </Text>
        </View>
        <View style={subscriptionAgreementStyles.section}>
          <Text style={subscriptionAgreementStyles.label}>
            1. Subscription details
          </Text>
          <Table style={subscriptionAgreementStyles.table}>
            <TH style={subscriptionAgreementStyles.thead}>
              <TD>Field</TD>
              <TD>Value</TD>
            </TH>
            <TR>
              <TD>User email</TD>
              <TD>{email}</TD>
            </TR>
            <TR>
              <TD>Subscription type</TD>
              <TD>{type}</TD>
            </TR>
            <TR>
              <TD>Start date</TD>
              <TD>{dateFormater(startDate).split('-').reverse().join('.')}</TD>
            </TR>
            <TR>
              <TD>End date</TD>
              <TD>{dateFormater(endDate).split('-').reverse().join('.')}</TD>
            </TR>
          </Table>
        </View>
        <View style={subscriptionAgreementStyles.section}>
          <Text style={subscriptionAgreementStyles.label}>
            2. Subject of agreement
          </Text>
          <Text style={subscriptionAgreementStyles.text}>
            The Service Provider grants the User a non-exclusive,
            non-transferable right to access the online cinema platform
            "Kibutsuji" under the terms of this Agreement and the selected
            Subscription Type.
          </Text>
        </View>
        <View style={subscriptionAgreementStyles.section}>
          <Text style={subscriptionAgreementStyles.label}>
            3. Subscription plans
          </Text>
          <Text style={subscriptionAgreementStyles.ul}>
            3.1. FAN Plan: Standard definition access. Single concurrent stream.
          </Text>
          <Text style={subscriptionAgreementStyles.ul}>
            3.2. MEGAFAN Plan: Ultra HD access. Up to 4 concurrent streams.
            Priority support.
          </Text>
        </View>
        <View style={subscriptionAgreementStyles.section}>
          <Text style={subscriptionAgreementStyles.label}>
            4. Billing and renewal
          </Text>
          <Text style={subscriptionAgreementStyles.ul}>
            4.1. The subscription begins on the date of purchase and continues
            until the Expiration Date stated in Section 1.
          </Text>
          <Text style={subscriptionAgreementStyles.ul}>
            4.2. Automatic Renewal: Unless the User cancels at least 24 hours
            before the Expiration Date, the subscription will automatically
            renew for the same duration at the then-current price.
          </Text>
          <Text style={subscriptionAgreementStyles.ul}>
            4.3. Cancellation: Users may cancel at any time via their account.
            Cancellation takes effect at the end of the current billing period.
          </Text>
          <Text style={subscriptionAgreementStyles.ul}>
            4.4. No Refunds: All payments are non-refundable. No credits are
            issued for partial billing periods.
          </Text>
        </View>
        <View style={subscriptionAgreementStyles.section}>
          <Text style={subscriptionAgreementStyles.label}>
            5. User obligations
          </Text>
          <Text style={subscriptionAgreementStyles.text}>
            The User agrees not to share account credentials, reproduce,
            distribute, or publicly perform any content without authorization.
          </Text>
        </View>
        <View style={subscriptionAgreementStyles.section}>
          <Text style={subscriptionAgreementStyles.label}>
            7. Governing law
          </Text>
          <Text style={subscriptionAgreementStyles.text}>
            This Agreement shall be governed by the laws of the jurisdiction
            where the Service Provider is established.
          </Text>
        </View>
        <View style={subscriptionAgreementStyles.section}>
          <Text style={subscriptionAgreementStyles.label}>8. Acceptance</Text>
          <Text style={subscriptionAgreementStyles.text}>
            By clicking "Subscribe," "Start Membership," or providing payment
            details, the User acknowledges they have read, understood, and agree
            to be bound by this Agreement.
          </Text>
        </View>
        <View style={subscriptionAgreementStyles.footer}>
          <Text>Subscription Agreement - {type} Plan</Text>
        </View>
      </Page>
    </Document>
  )
}

export default SubscriptionAgreementDocument
