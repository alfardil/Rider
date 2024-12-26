import { ReportedProblem } from "../types/types";

export const FAKE_DATA: ReportedProblem[] = [
  {
    id: 1,
    title: "Pothole on Main Street",
    description: "There is a large pothole on Main Street that is causing damage to cars.",
    status: "Open",
    date: "2021-06-01",
    location: { latitude: 40.712776, longitude: -74.005974 }, 
    verified: false, 
  },
  {
    id: 2,
    title: "Broken Street Light",
    description: "The street light on the corner of Elm Street and Maple Street is broken.",
    status: "In Progress",
    date: "2021-06-02",
    location: { latitude: 40.73061, longitude: -73.935242 }, 
    verified: true, 
  },
  {
    id: 3,
    title: "Graffiti on Park Bench",
    description: "There is graffiti on the park bench in the town square.",
    status: "Resolved",
    date: "2021-06-03",
    location: { latitude: 40.650002, longitude: -73.949997 }, 
    verified: true, 
  },
  {
    id: 4,
    title: "Trash in the Park",
    description: "There is trash scattered throughout the park.",
    status: "Open",
    date: "2021-06-04",
    location: { latitude: 40.844782, longitude: -73.864827 }, 
    verified: false, 
  },
  {
    id: 5,
    title: "Abandoned Vehicle",
    description: "There is an abandoned vehicle on the side of the road.",
    status: "In Progress",
    date: "2021-06-05",
    location: { latitude: 40.579021, longitude: -74.151535 }, 
    verified: true, 
  },
  {
    id: 6,
    title: "Vandalism at the Library",
    description: "There has been vandalism at the local library.",
    status: "Resolved",
    date: "2021-06-06",
    location: { latitude: 40.748817, longitude: -73.985428 }, 
    verified: true, 
  },
  {
    id: 7,
    title: "Overgrown Grass",
    description: "The grass in the park is overgrown and needs to be cut.",
    status: "Open",
    date: "2021-06-07",
    location: { latitude: 40.730823, longitude: -73.997332 },
    verified: false, 
  },
]

export default FAKE_DATA;