import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image,Font } from '@react-pdf/renderer';

// Register the font
// Font.register({
//     family: 'Roboto Slab',
//     src: 'https://fonts.gstatic.com/s/robotoslab/v23/BngMUXZYTXPIvIBgJJSb6ufN5qU.woff2',
//     color:"white",
// });
const styles = StyleSheet.create({
    page: { flexDirection: 'row', padding: 0, fontSize: 12, color: '#333' },
    leftColumn: { width: '33%', color: "white", paddingLeft: 20, backgroundColor: '#323B4C', borderRight: '1px solid #ccc' },
    rightColumn: { width: '67%', padding: 10 },
    profileImage: { width: 100, height: 100, borderRadius: '50%', marginBottom: 10, alignSelf: 'center' },
    sectionTitle: {
        fontFamily: 'Helvetica',
        color:"white",
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 15,
        textTransform: 'uppercase',
        borderBottom: '1px solid #fff',
        paddingBottom: 3
    },
    text: {fontFamily: 'Helvetica', marginBottom: 5, lineHeight: 1.5 },
    contactTitle: {fontFamily: 'Helvetica', marginTop: 15, fontSize: 10, fontWeight: '1000', marginBottom: 2 },
    contactText: {fontFamily: 'Helvetica', fontSize: 9, marginBottom: 10, color: "#D3D3D3"},
    educationTitle: {fontFamily: 'Helvetica', marginTop: 10, fontSize: 10, color: "#D3D3D3", marginBottom: 2 },
    educationText: {fontFamily: 'Helvetica', fontSize: 9, marginBottom: 2, color: "white",fontWeight: '1000'},
    skillsList: {fontFamily: 'Helvetica', marginLeft: 0, marginTop: 10 },
    skillItem: { fontFamily: 'Helvetica',fontSize: 10,marginBottom: 12, marginLeft: 0, color: "#D3D3D3"},
});

const MyPdfDocument = ({ header, experiences, skills, education }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Left Column */}
            <View style={styles.leftColumn}>
                {/* Profile Image */}
                <Image style={styles.profileImage} src={'https://static.vecteezy.com/system/resources/previews/022/713/469/non_2x/cute-cat-isolated-on-solid-background-free-photo.jpg'} />

                {/* Contact Info */}
                <View>
                    <Text style={styles.sectionTitle}>Contact</Text>
                    <Text style={styles.contactTitle}>Phone</Text>
                    <Text style={styles.contactText}>{header.phone}</Text>
                    <Text style={styles.contactTitle}>Email</Text>
                    <Text style={styles.contactText}>{header.email}</Text>
                    <Text style={styles.contactTitle}>Location</Text>
                    <Text style={styles.contactText}>{header.location}</Text>
                    {header.personal_site ? <><Text style={styles.contactTitle}>Website</Text>
                    <Text style={styles.contactText}>{header.personal_site}</Text></>:<></>}
                </View>

                {/* Education */}
                <View>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {education.map((edu, index) => (
                        <View key={index}>

                            <Text style={styles.educationTitle}>{edu?.graduation_date?.split('-')[0]}</Text>
                            <Text style={styles.educationText}>{edu.degree} </Text>
                            <Text style={styles.educationText}>
                            {edu.institution}
                            </Text>

                            {/* <Text style={styles.text}>{edu.degree} - {edu.institution}</Text>
                            <Text style={styles.text}>{edu.place}, {edu.country}</Text>
                            <Text style={styles.text}>
                                {edu.initial_date} - {edu.graduation_date}
                            </Text> */}
                        </View>
                    ))}
                </View>

                {/* Skills */}
                <View>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.skillsList}>
                        {skills.map((skill, index) => (
                            <Text key={index} style={styles.skillItem}>
                                • {skill.skill_name}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>

            {/* Right Column */}
            <View style={styles.rightColumn}>
                {/* Name and Title */}
                <Text style={styles.headerName}>{header.name}</Text>
                <Text style={styles.headerTitle}>{header.current_position || header.professional_title}</Text>

                {/* Professional Summary */}
                <Text style={styles.summary}>{header.professional_summary}</Text>

                {/* Work Experience */}
                <View>
                    <Text style={styles.sectionTitle}>Work Experience</Text>
                    {experiences.map((exp, index) => (
                        <View key={index} style={styles.experienceItem}>
                            <Text style={styles.text}>{exp.job_title} at {exp.company_name}</Text>
                            <Text style={styles.text}>
                                {exp.initial_date} - {exp.current ? 'Present' : exp.end_date}
                            </Text>
                            <Text style={styles.text}>{exp.description}</Text>
                        </View>
                    ))}
                </View>

                {/* References */}
                <View style={styles.references}>
                    <Text style={styles.sectionTitle}>References</Text>
                    <Text style={styles.text}>John Doe, Senior Manager, Example Inc. (john.doe@example.com)</Text>
                    <Text style={styles.text}>Jane Smith, CEO, Another Co. (jane.smith@anotherco.com)</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default MyPdfDocument;
