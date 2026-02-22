/**
 * Rehab Centers Data
 * Centralized data file containing all rehab center information
 * Each center has complete details for all pages
 */

const rehabCentersData = [
    {
        id: 1,
        slug: "himalayan-sanctuary",
        name: "The Himalayan Sanctuary",
        shortName: "Himalayan Sanctuary",
        location: "Rishikesh, Uttarakhand",
        city: "Rishikesh",
        state: "Uttarakhand",
        description: "A serene environment focused on spiritual and physical recovery. We combine 12-step programs with traditional yoga and meditation sessions for holistic healing.",
        fullDescription: "The Himalayan Sanctuary is a premier rehabilitation center nestled in the spiritual city of Rishikesh, known as the Yoga Capital of the World. Our unique approach combines evidence-based 12-step programs with traditional yoga, meditation, and Ayurvedic therapies. The serene environment of the Himalayas provides the perfect backdrop for individuals seeking recovery from addiction. Our team of certified professionals includes psychiatrists, psychologists, yoga therapists, and holistic healers who work together to create personalized treatment plans for each individual.",
        images: {
            hero: "https://images.unsplash.com/photo-1545208393-596371ba4a22?w=1200",
            card: "https://images.unsplash.com/photo-1545208393-596371ba4a22?w=800",
            gallery: [
                "https://images.unsplash.com/photo-1545208393-596371ba4a22?w=600",
                "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600",
                "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600"
            ]
        },
        programs: [
            {
                title: "Alcohol De-addiction Program",
                duration: "28-90 days",
                description: "Comprehensive program for alcohol addiction recovery using 12-step methodology combined with yoga therapy.",
                features: ["Medical Detox", "Individual Therapy", "Group Counseling", "Yoga Sessions", "Aftercare Planning"]
            },
            {
                title: "Drug Rehabilitation Program",
                duration: "30-120 days",
                description: "Specialized program for drug addiction including prescription medications and illicit substances.",
                features: ["Dual Diagnosis", "Medical Supervision", "Relapse Prevention", "Family Therapy", "Holistic Healing"]
            },
            {
                title: "Mental Wellness Program",
                duration: "14-30 days",
                description: "Focus on mental health issues including depression, anxiety, and stress management.",
                features: ["Psychiatric Evaluation", "Mindfulness Training", "Meditation", "Art Therapy", "Life Skills"]
            },
            {
                title: "Yoga Recovery Retreat",
                duration: "7-21 days",
                description: "Immersive yoga and meditation program for those seeking a spiritual approach to recovery.",
                features: ["Daily Yoga", "Meditation", "Nature Walks", "Spiritual Counseling", "Organic Meals"]
            }
        ],
        therapy: {
            methods: [
                "Cognitive Behavioral Therapy (CBT)",
                "Dialectical Behavior Therapy (DBT)",
                "Motivational Interviewing",
                "12-Step Facilitation",
                "Yoga Therapy",
                "Meditation & Mindfulness",
                "Art Therapy",
                "Music Therapy"
            ],
            counseling: [
                "Individual One-on-One Sessions",
                "Group Therapy Sessions",
                "Family Counseling",
                "Couples Therapy",
                "Peer Support Groups"
            ],
            medical: [
                "Medical Detoxification",
                "Psychiatric Consultations",
                "24/7 Medical Supervision",
                "Medication Management",
                "Health Monitoring"
            ]
        },
        facilities: {
            accommodation: [
                "Private Rooms with Attached Bath",
                "Semi-Private Rooms",
                "Air-Conditioned Suites",
                "Garden View Rooms",
                "Meditation Room"
            ],
            common: [
                "Yoga Hall",
                "Meditation Center",
                "Library",
                "Outdoor Garden",
                "River View Terrace",
                "Nutrition Cafe"
            ],
            wellness: [
                "Ayurvedic Spa",
                "Natural Swimming Pool",
                "Herbal Garden",
                "Walking Trails",
                "Fitness Center"
            ]
        },
        blogContent: {
            articles: [
                {
                    title: "Finding Peace in the Himalayas: A Recovery Journey",
                    excerpt: "Discover how the serene mountains of Rishikesh provide the perfect setting for addiction recovery.",
                    date: "2024-01-15",
                    category: "Recovery Story"
                },
                {
                    title: "The Power of Yoga in Addiction Treatment",
                    excerpt: "How yoga and meditation complement traditional addiction treatment methods.",
                    date: "2024-01-10",
                    category: "Treatment"
                },
                {
                    title: "Understanding the 12-Step Program",
                    excerpt: "A comprehensive guide to the 12-step recovery program and its effectiveness.",
                    date: "2024-01-05",
                    category: "Education"
                }
            ],
            successStories: [
                {
                    name: "Rahul S.",
                    story: "After struggling with alcohol addiction for 10 years, I found my way to The Himalayan Sanctuary. The combination of therapy and yoga changed my life completely.",
                    duration: "Completed program in 2023"
                },
                {
                    name: "Priya M.",
                    story: "The serene environment and caring staff helped me overcome my addiction. I learned valuable life skills that I use every day.",
                    duration: "Completed program in 2023"
                }
            ],
            tips: [
                "Start each day with meditation to center your thoughts",
                "Connect with others in recovery for support",
                "Practice yoga regularly to maintain physical and mental health",
                "Keep a journal to track your progress and emotions"
            ]
        },
        contact: {
            phone: "+91 98765 43210",
            email: "himalayan@rehabcare.in",
            address: "The Himalayan Sanctuary, Near Laxman Jhula, Rishikesh, Uttarakhand 249302",
            emergencyPhone: "1800-XXX-XXXX",
            hours: "24/7 Admissions"
        },
        seo: {
            title: "The Himalayan Sanctuary | Best Rehab Center in Rishikesh",
            description: "Premier rehabilitation center in Rishikesh combining 12-step programs with yoga and meditation for addiction recovery.",
            keywords: "rehab center rishikesh, addiction treatment, alcohol de-addiction, drug rehabilitation, yoga therapy"
        },
        rating: 4.8,
        verified: true,
        priceRange: "₹1,50,000 - ₹3,50,000"
    },
    {
        id: 2,
        slug: "azure-beach-retreat",
        name: "Azure Beach Retreat",
        shortName: "Azure Beach",
        location: "South Goa",
        city: "Goa",
        state: "Goa",
        description: "India's premier luxury de-addiction center. Our facility offers private beachfront access and world-class psychiatric care for elite recovery.",
        fullDescription: "Azure Beach Retreat is India's most prestigious luxury rehabilitation center, located in the tranquil shores of South Goa. We offer an exclusive, confidential environment for individuals seeking treatment for addiction and mental health issues. Our world-class facilities include private beachfront access, luxury suites with ocean views, and a team of internationally trained psychiatrists and therapists. We provide personalized treatment plans combining evidence-based therapies with holistic wellness practices in a setting that promotes relaxation and recovery.",
        images: {
            hero: "https://images.unsplash.com/photo-1512100356956-c12872638f5f?w=1200",
            card: "https://images.unsplash.com/photo-1512100356956-c12872638f5f?w=800",
            gallery: [
                "https://images.unsplash.com/photo-1512100356956-c12872638f5f?w=600",
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600",
                "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600"
            ]
        },
        programs: [
            {
                title: "Luxury De-addiction Program",
                duration: "30-90 days",
                description: "Exclusive program for alcohol and drug addiction in a luxury beachfront setting.",
                features: ["Private Suite", "Personal Chef", "Beach Therapy", "Spa Treatments", "Executive Coaching"]
            },
            {
                title: "Executive Recovery Program",
                duration: "21-60 days",
                description: "Designed for professionals and executives needing confidential, discreet treatment.",
                features: ["Privacy Guarantee", "Business Concierge", "Workstation", "Video Conferencing", "Leadership Coaching"]
            },
            {
                title: "Couples Recovery Program",
                duration: "30-45 days",
                description: "Joint treatment program for couples recovering from addiction together.",
                features: ["Joint Sessions", "Relationship Counseling", "Communication Skills", "Shared Activities", "Aftercare"]
            },
            {
                title: "Mental Health Retreat",
                duration: "14-30 days",
                description: "Comprehensive treatment for depression, anxiety, and other mental health conditions.",
                features: ["Psychiatric Care", "Therapy Sessions", "Mindfulness", "Adventure Therapy", "Nutrition Planning"]
            }
        ],
        therapy: {
            methods: [
                "Cognitive Behavioral Therapy (CBT)",
                "Eye Movement Desensitization (EMDR)",
                "Motivational Enhancement Therapy",
                "Solution-Focused Therapy",
                "Beach Therapy",
                "Adventure Therapy",
                "Music & Art Therapy",
                "Equine Therapy"
            ],
            counseling: [
                "Individual Therapy",
                "Group Sessions",
                "Family Therapy",
                "Couples Counseling",
                "Alumni Support"
            ],
            medical: [
                "Medical Detox",
                "Psychiatric Evaluation",
                "Medication Management",
                "24/7 Nursing Care",
                "Health Assessments"
            ]
        },
        facilities: {
            accommodation: [
                "Luxury Ocean View Suites",
                "Private Beachfront Cottages",
                "Premium Rooms with Balcony",
                "Butler Service",
                "In-Room Dining"
            ],
            common: [
                "Private Beach Access",
                "Infinity Pool",
                "Spa & Wellness Center",
                "Fitness Club",
                "Tennis Court",
                "Private Cinema"
            ],
            wellness: [
                "Ayurvedic Spa",
                "Beachfront Yoga Pavilion",
                "Meditation Garden",
                "Hydrotherapy Pool",
                "Nutrition Kitchen"
            ]
        },
        blogContent: {
            articles: [
                {
                    title: "Luxury Recovery: A New Approach to Addiction Treatment",
                    excerpt: "How luxury rehab centers are changing the face of addiction treatment in India.",
                    date: "2024-01-20",
                    category: "Treatment"
                },
                {
                    title: "The Healing Power of the Ocean",
                    excerpt: "Understanding how beach environments contribute to mental health and recovery.",
                    date: "2024-01-18",
                    category: "Wellness"
                },
                {
                    title: "Breaking the Stigma: Seeking Help is Strength",
                    excerpt: "Why more professionals are choosing luxury rehab for discreet treatment.",
                    date: "2024-01-12",
                    category: "Education"
                }
            ],
            successStories: [
                {
                    name: "Vikram K.",
                    story: "As a busy executive, I needed a place that understood my pressures. Azure Beach provided the perfect blend of treatment and privacy.",
                    duration: "Completed program in 2023"
                },
                {
                    name: "Anjali P.",
                    story: "The luxury setting helped me feel comfortable and safe during my recovery journey. The staff was incredibly supportive.",
                    duration: "Completed program in 2023"
                }
            ],
            tips: [
                "Take time to enjoy the small things during recovery",
                "Connect with nature for mental peace",
                "Build a support network that understands your journey",
                "Prioritize self-care and wellness"
            ]
        },
        contact: {
            phone: "+91 98765 43211",
            email: "azure@rehabcare.in",
            address: "Azure Beach Retreat, South Goa, Goa 403524",
            emergencyPhone: "1800-XXX-XXXX",
            hours: "24/7 Admissions"
        },
        seo: {
            title: "Azure Beach Retreat | Luxury Rehab Center in Goa",
            description: "India's premier luxury de-addiction center in Goa with private beachfront access and world-class psychiatric care.",
            keywords: "luxury rehab goa, addiction treatment, private beach, executive rehab, premium de-addiction"
        },
        rating: 4.9,
        verified: true,
        priceRange: "₹3,00,000 - ₹8,00,000"
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = rehabCentersData;
}

