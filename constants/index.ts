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
      label: 'Dashboard',
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
    eventCapacity: 0, // Default for event capacity (optional)
    mapLocation: '', // Default for map location (optional)
    coordinators: [{ name: '', email: '', phone: '' }], // Default for one coordinator with mandatory fields
    registrationEndDate: new Date(), // Default for registration end date
  };
  
  
  export const featureCards = [
    {
      id: 1,
      title: "Event Discovery",
      points: [
        "Explore premier events hosted by TURF, ensuring you never miss out on exciting experiences.",
        "Easily discover events by category, date, or location, making it simple to find what interests you most.",
        "Access comprehensive event details, including date, time, venue, and more to make informed decisions."
      ]
    },
    {
      id: 2,
      title: "Easy Booking",
      points: [
        "Experience a straightforward and intuitive event booking system that caters to all users.",
        "Choose from various online payment options for secure and convenient ticket purchases.",
        "Enjoy immediate booking confirmations and e-tickets sent directly to your inbox."
      ]
    },
    {
      id: 3,
      title: "Personalized Experience",
      points: [
        "Receive tailored event recommendations based on your unique interests and preferences.",
        "Set up custom reminders and notifications for upcoming events, ensuring you never miss an important date.",
        "Easily save your favorite events for quick access and updates, streamlining your event planning."
      ]
    }
  ];
  