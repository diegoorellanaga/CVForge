import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image,Font } from '@react-pdf/renderer';

// Register the font
// Font.register({
//     family: 'Roboto Slab',
//     src: 'https://fonts.gstatic.com/s/robotoslab/v23/BngMUXZYTXPIvIBgJJSb6ufN5qU.woff2',
//     color:"white",
// });
const styles = StyleSheet.create({
    summaryContainer:{ height: 135,  marginBottom: 10 },
    imageContainer:{ height: 150,  marginBottom: 10 },
    page: { flexDirection: 'row', padding: 0, fontSize: 12, color: '#333' },
    leftColumn: {paddingTop: "25px" , width: '33%', color: "white", paddingLeft: 20, backgroundColor: '#323B4C', borderRight: '1px solid #ccc' },
    rightColumn: { width: '67%',paddingTop: "40px" ,paddingLeft:"20px", paddingRight:"40px" },
    profileImage: { width: 120, height: 120, borderRadius: '50%', marginBottom: 10, alignSelf: 'center',marginRight:"20px" },
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
    experienceTitle: {
        fontFamily: 'Helvetica',
        color:"black",
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 15,
        textTransform: 'uppercase',
        borderBottom: '1px solid #000',
        paddingBottom: 3
    },
    headerName: {fontSize: 30, fontFamily: 'Helvetica', marginBottom: "0px", marginBottom:"0px", lineHeight: 1.5 },
    headerTitle: {fontSize: 15, fontFamily: 'Helvetica',marginTop:"0px",paddingTop:"0px", marginBottom: 3, lineHeight: 1.5 },
    summary: {fontSize: 9, fontFamily: 'Helvetica', marginBottom: 5, lineHeight: 1.5 },
    text: {fontFamily: 'Helvetica', marginBottom: 5, lineHeight: 1.5 },
    contactTitle: {fontFamily: 'Helvetica', marginTop: 15, fontSize: 10, fontWeight: '1000', marginBottom: 2 },
    contactText: {fontFamily: 'Helvetica', fontSize: 9, marginBottom: 10, color: "#D3D3D3"},
    educationTitle: {fontFamily: 'Helvetica', marginTop: 10, fontSize: 10, color: "#D3D3D3", marginBottom: 2 },
    educationText: {fontFamily: 'Helvetica', fontSize: 9, marginBottom: 2, color: "white",fontWeight: '1000'},
    skillsList: {fontFamily: 'Helvetica', marginLeft: 0, marginTop: 10,        display: 'flex',
        flexDirection: 'column' },
    skillItem: {justifyContent: 'space-between', width: '100%', fontFamily: 'Helvetica',fontSize: 10,marginBottom: 8, marginLeft: 0, color: "#D3D3D3", flexDirection: 'row'},
    checkIcon: {
        width: 12,
        height: 12,
    },
    certifiedText: {
        fontSize: 10,
        color: 'green',
        marginRight:20,
    },
    timelineContainer: { position: 'relative', marginLeft: 0, paddingLeft: 0, marginTop:20 },
    timelineLine: {
        position: 'absolute',
        left: 2, // Adjust to center the line behind the circles
        top: 0,
        bottom: 0,
        width: 1,
        height: "93%",
        backgroundColor: '#000',
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 20,
        position: 'relative',
    },
    timelineCircle: {
        width: 6,
        height: 6,
        borderRadius: 3, // Full circle
        backgroundColor: '#fff',
        position: 'absolute',
        border: ' 1px solid black', // Black border color
        left: -1, // Position the circle centered on the line
        top: 0, // Slight adjustment to align vertically with text
    },
    timelineTextContainer: { marginLeft: 20 }, // Space text to the right of the circle
    timelineDate: { fontSize: 10,marginBottom:"3px", fontWeight: 'bold', color: '#333' },
    timelineDetails: { fontSize: 9, lineHeight: 1.4, color: '#333' },
    timelineJobTitle: {fontSize: 12,marginBottom:"5px", fontWeight: 'bold', color: '#333' },
    referencesContainer: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        marginTop: 10 
    },
    referenceItem: { 
        width: '48%', 
        marginBottom: 10 
    },
    referenceName: { 
        fontSize: 11, 
        fontWeight: 'bold', 
        marginBottom: 2 
    },
    referenceDetails: { 
        fontSize: 9, 
        marginBottom: 2 
    },
    referenceLabel: { 
        fontSize: 8, 
        fontWeight: 'bold' 
    },
    referenceValue: { 
        fontSize: 8 
    },
    languageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    
    languageName: {
        fontFamily: 'Helvetica',fontWeight: 'bold' ,fontSize: 10,marginBottom: 8, marginLeft: 0, color: "white",
    },
    
    languageProficiency: {
        fontSize: 12,
    },

    languageStars: {
        fontSize: 12,
        marginRight:20,
        textAlign: 'left'
        
    },



});
//size="A4" 
const MyPdfDocument = ({ header, experiences, skills, education, imgURL, references,extraactivities,languages }) => (
    <Document>
        <Page size={{ width: 595.28, height: 'auto' }} style={styles.page}>
            {/* Left Column */}
            <View style={styles.leftColumn}>
                {/* Profile Image */}
                <View style={styles.imageContainer}>
                {imgURL && <Image style={styles.profileImage} src={imgURL} />}
                </View>
                {/* Contact Info */}
                <View>
                    <Text style={styles.sectionTitle}>Contact</Text>
                    {header?.phone ? <> <Text style={styles.contactTitle}>Phone</Text>
                    <Text style={styles.contactText}>{header?.phone}</Text> </> : <></> }

                   {header?.email ? <>   <Text style={styles.contactTitle}>Email</Text>
                    <Text style={styles.contactText}>{header?.email}</Text> </> : <></> }

                    {header?.location ? <>   <Text style={styles.contactTitle}>Location</Text>
                    <Text style={styles.contactText}>{header?.location}</Text></> : <></> }

                    {header?.personal_site ? <><Text style={styles?.contactTitle}>Website</Text>
                    <Text style={styles.contactText}>{header?.personal_site}</Text></>:<></>}
                </View>

                {/* Education */}
                <View>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {education && education.map((edu, index) => (
                        <View key={index}>

                            <Text style={styles.educationTitle}>{edu?.graduation_date?.split('-')[0]}</Text>
                            <Text style={styles.educationText}>{edu?.degree} </Text>
                            <Text style={styles.educationText}>
                            {edu?.institution}
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
                {/* <View>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.skillsList}>
                        {skills && skills.map((skill, index) => (
                            <Text key={index} style={styles.skillItem}>
                                • {skill?.skill_name}
                            </Text>
                        ))}
                    </View>
                </View> */}
                    <View>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <View style={styles.skillsList}>
                            {skills && skills.map((skill, index) => (
                                <View key={index} style={styles.skillItem}>
                                    <Text>• {skill?.skill_name}</Text>
                                    {skill?.certificate && <Text style={styles.certifiedText}><Image src="/images/check1.png" style={styles.checkIcon} />{" Certified"}</Text>}
                                </View>
                            ))}
                        </View>
                    </View>


                <View>
    <Text style={styles.sectionTitle}>Languages</Text>
    <View style={styles.skillsList}>
        {languages && languages.length > 0 ? (
            languages.map((lang, index) => (
                <View key={index} style={styles.languageRow}>
                    <Text style={styles.languageName}>{lang.language}</Text>
                    <Text style={styles.languageStars}>
                        {Array(
                            lang.proficiency === 'Beginner' ? 1 :
                            lang.proficiency === 'Intermediate' ? 2 :
                            lang.proficiency === 'Fluent' ? 3 : 0
                        ).fill('*').join(' ')}
                    </Text>
                </View>
            ))
        ) : (
            <Text style={styles.text}>No languages available</Text>
        )}
    </View>
</View>







            </View>

            {/* Right Column */}
            <View style={styles.rightColumn}>
                {/* Name and Title */}
                <View style={styles.summaryContainer}>
                <Text style={styles.headerName}>{header?.name}</Text>
                <Text style={styles.headerTitle}>{header?.current_position || header?.professional_title}</Text>

                {/* Professional Summary */}
                <Text style={styles.summary}>{header?.professional_summary}</Text>
                </View>
                {/* Work Experience */}
                <View>
                <Text style={styles.experienceTitle}>Work Experience</Text>
                <View>

                <View style={styles.timelineContainer}>
                    {/* Vertical Line */}
                    <View style={styles.timelineLine}></View>
                    {/* Timeline Items */}
                    {experiences.map((exp, index) => (
                        <View key={index} style={styles.timelineItem}>
                            {/* Circle */}
                            <View style={styles.timelineCircle}></View>
                            {/* Text */}
                            <View style={styles.timelineTextContainer}>
                                <Text style={styles.timelineDate}>
                                    {exp?.initial_date} - {exp?.current ? 'Present' : exp?.end_date}
                                </Text>
                                <Text style={styles.timelineDetails}>
                                {exp?.company_name} | {exp?.place} 
                                </Text>
                                <Text style={styles.timelineJobTitle}>
                                    {exp?.job_title} 
                                </Text>
                                <Text style={styles.timelineDetails}>{exp?.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
            </View>



            <Text style={styles.experienceTitle}>Extra Activities </Text>
                <View>

                <View style={styles.timelineContainer}>
                    {/* Vertical Line */}


                    <View style={styles.timelineLine}></View>
                    {/* Timeline Items */}
                    {extraactivities.map((exp, index) => (
                        <View key={index} style={styles.timelineItem}>
                            {/* Circle */}
                            <View style={styles.timelineCircle}></View>
                            {/* Text */}
                            <View style={styles.timelineTextContainer}>
                                <Text style={styles.timelineDate}>
                                    {exp?.initial_date} - {exp?.current ? 'Present' : exp?.end_date}
                                </Text>
                                <Text style={styles.timelineDetails}>
                                {exp?.company_name} | {exp?.place} 
                                </Text>
                                <Text style={styles.timelineJobTitle}>
                                    {exp?.job_title} 
                                </Text>
                                <Text style={styles.timelineDetails}>{exp?.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                </View>









                {/* References */}
                <View>
    <Text style={styles.experienceTitle}>References</Text>
    {references && references.length > 0 ? (
        <View style={styles.referencesContainer}>
            {references.map((ref, index) => (
                <View key={index} style={styles.referenceItem}>
                    <Text style={styles.referenceName}>
                        {ref.name} {ref.last_name}
                    </Text>
                    <Text style={styles.referenceDetails}>
                        {ref.position}, {ref.company_name}
                    </Text>
                    <Text style={styles.referenceLabel}>
                        Phone: <Text style={styles.referenceValue}>{ref.phone}</Text>
                    </Text>
                    <Text style={styles.referenceLabel}>
                        Email: <Text style={styles.referenceValue}>{ref.email}</Text>
                    </Text>
                </View>
            ))}
        </View>
    ) : (
        <Text style={styles.text}>No references available</Text>
    )}
</View>




            </View>
        </Page>
    </Document>
);

export default MyPdfDocument;
