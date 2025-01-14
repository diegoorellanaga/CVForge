// components/MyPdfDocument.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10 },
    title: { fontSize: 24, marginBottom: 20 },
    text: { fontSize: 12, marginBottom: 5 },
    experienceContainer: { marginTop: 20, borderTop: '1px solid black', paddingTop: 10 },
    experienceTitle: { fontSize: 18, marginBottom: 10 }
});

const MyPdfDocument = ({ header, experiences }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header Section */}
            <Text style={styles.title}>Resume Header</Text>
            <View style={styles.section}>
                <Text style={styles.text}>Name: {header.name}</Text>
                <Text style={styles.text}>Professional Summary: {header.professional_summary}</Text>
                <Text style={styles.text}>Phone: {header.phone}</Text>
                <Text style={styles.text}>Email: {header.email}</Text>
                <Text style={styles.text}>Location: {header.location}</Text>
                <Text style={styles.text}>Personal Site: {header.personal_site}</Text>
                <Text style={styles.text}>Current Company: {header.current_company}</Text>
                <Text style={styles.text}>Current Position: {header.current_position}</Text>
            </View>

            {/* Experiences Section */}
            <View style={styles.experienceContainer}>
                <Text style={styles.experienceTitle}>Work Experience</Text>
                {experiences.map((exp, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.text}>Job Title: {exp.job_title}</Text>
                        <Text style={styles.text}>Company: {exp.company_name}</Text>
                        <Text style={styles.text}>Place: {exp.place}</Text>
                        <Text style={styles.text}>Start Date: {exp.initial_date}</Text>
                        <Text style={styles.text}>End Date: {exp.current ? 'Present' : exp.end_date}</Text>
                        <Text style={styles.text}>Description: {exp.description}</Text>
                        <Text style={styles.text}>Departure Reason: {exp.departure_reason}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default MyPdfDocument;
