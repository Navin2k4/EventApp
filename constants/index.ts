export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Create Event',
      route: '/events/create',
    },
    {
      label: 'My Profile',
      route: '/profile',
    },
  ]
  
  export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
  }

  export const featureCards = [
    {
      id: 1,
      title: "Event Discovery",
      points: [
        "Explore a diverse range of premier events hosted by TURF.",
        "Discover events by category, date, or location.",
        "View comprehensive event details including date, time, and venue."
      ]
    },
    {
      id: 2,
      title: "Easy Booking",
      points: [
        "Enjoy a simple and intuitive event booking process.",
        "Securely purchase tickets with various online payment options.",
        "Receive instant confirmation and e-tickets upon booking."
      ]
    },
    {
      id: 3,
      title: "Personalized Experience",
      points: [
        "Receive personalized event recommendations based on your interests.",
        "Set up customizable event reminders and notifications.",
        "Save favorite events for quick access and updates."
      ]
    },
    {
      id: 4,
      title: "Seamless Integration",
      points: [
        "Integrate your calendar with event schedules to stay organized.",
        "Sync your bookings across multiple devices.",
        "Connect with social media to share and invite friends."
      ]
    }
  ];
  