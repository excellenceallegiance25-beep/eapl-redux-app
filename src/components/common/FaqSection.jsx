import {
    ExpandMore
} from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Typography
} from '@mui/material';

const FaqSection = () => {
    return (
        <Box sx={{ mb: 4, height: '100%', mt: 4 }} >
            <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
                Frequently Asked Questions
            </Typography>

            {[
                {
                    question: 'What is your typical project timeline?',
                    answer: 'Project timelines vary based on complexity. Small projects typically take 4-8 weeks, while enterprise solutions can take 3-6 months.',
                },
                {
                    question: 'Do you provide ongoing support?',
                    answer: 'Yes, we offer various support packages including 24/7 monitoring, regular maintenance, and emergency support.',
                },
                {
                    question: 'Can you work with our existing infrastructure?',
                    answer: 'Absolutely. We specialize in integrating with legacy systems and modernizing existing infrastructure.',
                },
                {
                    question: 'What industries do you serve?',
                    answer: 'We serve clients across various industries including finance, healthcare, retail, manufacturing, and technology.',
                },
                {
                    question: 'What is your typical response time?',
                    answer: 'We respond to all inquiries within 24 hours during business days.',
                },
                {
                    question: 'Do you offer emergency support?',
                    answer: 'Yes, we provide 24/7 emergency support for our enterprise clients.',
                },
                {
                    question: 'Can I schedule a demo?',
                    answer: 'Absolutely! Contact our sales team to schedule a personalized demo.',
                },
            ].map((faq, index) => (
                <Accordion key={index} sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography fontWeight="bold">{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{faq.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default FaqSection;