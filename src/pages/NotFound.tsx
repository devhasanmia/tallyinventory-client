// InvoiceDocument.tsx
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image
} from "@react-pdf/renderer";

// Font register
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxM.ttf" },
    { src: "https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmWUlfBBc9.ttf", fontWeight: "bold" }
  ]
});

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 11,
    padding: 40,
    backgroundColor: "#ffffff"
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  section: {
    marginBottom: 10
  },
  bold: {
    fontWeight: "bold"
  },
  invoiceTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2d2d2d"
  },
  infoGroup: {
    marginBottom: 6
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#4f81bd",
    color: "#fff",
    padding: 8
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #ccc",
    padding: 8
  },
  col: {
    width: "25%"
  },
  totalSection: {
    marginTop: 20,
    alignItems: "flex-end"
  },
  totalText: {
    fontSize: 14,
    fontWeight: "bold"
  },
  footer: {
    marginTop: 40,
    textAlign: "center",
    fontStyle: "italic",
    color: "#888"
  }
});

const InvoiceDocument = () => {
  const data = {
    logoUrl: "https://via.placeholder.com/60x60.png?text=LOGO",
    companyName: "NextTech Solutions",
    companyEmail: "info@nexttech.com",
    customerName: "MD. HASAN MIA",
    customerEmail: "hasan@example.com",
    invoiceNo: "INV-0825-01",
    date: "August 3, 2025",
    items: [
      { name: "UI/UX Design", qty: 1, unitPrice: 300 },
      { name: "Domain & Hosting", qty: 1, unitPrice: 75 },
      { name: "Maintenance (3 months)", qty: 1, unitPrice: 120 }
    ]
  };

  const total = data.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Image style={styles.logo} src={data.logoUrl} />
            <Text style={styles.bold}>{data.companyName}</Text>
            <Text>{data.companyEmail}</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text>Invoice No: {data.invoiceNo}</Text>
            <Text>Date: {data.date}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Billed To:</Text>
          <Text>{data.customerName}</Text>
          <Text>{data.customerEmail}</Text>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.col}>Item</Text>
          <Text style={styles.col}>Quantity</Text>
          <Text style={styles.col}>Unit Price</Text>
          <Text style={styles.col}>Total</Text>
        </View>

        {data.items.map((item, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.col}>{item.name}</Text>
            <Text style={styles.col}>{item.qty}</Text>
            <Text style={styles.col}>${item.unitPrice}</Text>
            <Text style={styles.col}>${item.qty * item.unitPrice}</Text>
          </View>
        ))}

        <View style={styles.totalSection}>
          <Text style={styles.totalText}>Grand Total: ${total}</Text>
        </View>

        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
