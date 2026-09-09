import type { Airport } from "@/types/flights";

/**
 * Airports offered in the flight search.
 *
 * Curated rather than exhaustive: the Northeast and its gateways first, then
 * the Indian cities people actually fly to the region from. Codes and names are
 * public IATA facts, not business claims. Inventory is a separate question, the
 * upstream is fixed-departure stock, so many pairs will simply return nothing.
 */
export const AIRPORTS: Airport[] = [
  // --- Northeast and its gateways
  {
    code: "GAU",
    city: "Guwahati",
    name: "Lokpriya Gopinath Bordoloi International",
    state: "Assam",
    region: "northeast",
  },
  { code: "DIB", city: "Dibrugarh", name: "Mohanbari", state: "Assam", region: "northeast" },
  { code: "JRH", city: "Jorhat", name: "Rowriah", state: "Assam", region: "northeast" },
  { code: "IXS", city: "Silchar", name: "Kumbhirgram", state: "Assam", region: "northeast" },
  { code: "TEZ", city: "Tezpur", name: "Salonibari", state: "Assam", region: "northeast" },
  { code: "IXI", city: "Lilabari", name: "North Lakhimpur", state: "Assam", region: "northeast" },
  { code: "SHL", city: "Shillong", name: "Umroi", state: "Meghalaya", region: "northeast" },
  {
    code: "IMF",
    city: "Imphal",
    name: "Bir Tikendrajit International",
    state: "Manipur",
    region: "northeast",
  },
  { code: "AJL", city: "Aizawl", name: "Lengpui", state: "Mizoram", region: "northeast" },
  {
    code: "IXA",
    city: "Agartala",
    name: "Maharaja Bir Bikram",
    state: "Tripura",
    region: "northeast",
  },
  { code: "DMU", city: "Dimapur", name: "Dimapur", state: "Nagaland", region: "northeast" },
  { code: "PYG", city: "Pakyong", name: "Pakyong", state: "Sikkim", region: "northeast" },
  {
    code: "HGI",
    city: "Itanagar",
    name: "Donyi Polo",
    state: "Arunachal Pradesh",
    region: "northeast",
  },
  {
    code: "IXB",
    city: "Bagdogra",
    name: "Bagdogra, gateway to Sikkim and Darjeeling",
    state: "West Bengal",
    region: "northeast",
  },

  // --- Rest of India
  { code: "DEL", city: "Delhi", name: "Indira Gandhi International", state: "Delhi", region: "india" },
  {
    code: "BOM",
    city: "Mumbai",
    name: "Chhatrapati Shivaji Maharaj International",
    state: "Maharashtra",
    region: "india",
  },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda International", state: "Karnataka", region: "india" },
  {
    code: "CCU",
    city: "Kolkata",
    name: "Netaji Subhas Chandra Bose International",
    state: "West Bengal",
    region: "india",
  },
  { code: "MAA", city: "Chennai", name: "Chennai International", state: "Tamil Nadu", region: "india" },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi International", state: "Telangana", region: "india" },
  {
    code: "AMD",
    city: "Ahmedabad",
    name: "Sardar Vallabhbhai Patel International",
    state: "Gujarat",
    region: "india",
  },
  { code: "PNQ", city: "Pune", name: "Pune", state: "Maharashtra", region: "india" },
  { code: "GOI", city: "Goa", name: "Dabolim", state: "Goa", region: "india" },
  { code: "COK", city: "Kochi", name: "Cochin International", state: "Kerala", region: "india" },
  { code: "JAI", city: "Jaipur", name: "Jaipur International", state: "Rajasthan", region: "india" },
  {
    code: "LKO",
    city: "Lucknow",
    name: "Chaudhary Charan Singh International",
    state: "Uttar Pradesh",
    region: "india",
  },
  { code: "PAT", city: "Patna", name: "Jay Prakash Narayan", state: "Bihar", region: "india" },
  { code: "BBI", city: "Bhubaneswar", name: "Biju Patnaik International", state: "Odisha", region: "india" },
  {
    code: "VNS",
    city: "Varanasi",
    name: "Lal Bahadur Shastri International",
    state: "Uttar Pradesh",
    region: "india",
  },
  { code: "IXR", city: "Ranchi", name: "Birsa Munda", state: "Jharkhand", region: "india" },
  {
    code: "NAG",
    city: "Nagpur",
    name: "Dr. Babasaheb Ambedkar International",
    state: "Maharashtra",
    region: "india",
  },
  {
    code: "IXC",
    city: "Chandigarh",
    name: "Shaheed Bhagat Singh International",
    state: "Chandigarh",
    region: "india",
  },
  { code: "ATQ", city: "Amritsar", name: "Sri Guru Ram Dass Jee International", state: "Punjab", region: "india" },
  { code: "DED", city: "Dehradun", name: "Jolly Grant", state: "Uttarakhand", region: "india" },
  { code: "SXR", city: "Srinagar", name: "Sheikh ul-Alam International", state: "Jammu and Kashmir", region: "india" },
  { code: "IXJ", city: "Jammu", name: "Jammu", state: "Jammu and Kashmir", region: "india" },
  { code: "IXL", city: "Leh", name: "Kushok Bakula Rimpochee", state: "Ladakh", region: "india" },
  { code: "IDR", city: "Indore", name: "Devi Ahilya Bai Holkar", state: "Madhya Pradesh", region: "india" },
  { code: "BHO", city: "Bhopal", name: "Raja Bhoj", state: "Madhya Pradesh", region: "india" },
  { code: "RPR", city: "Raipur", name: "Swami Vivekananda", state: "Chhattisgarh", region: "india" },
  { code: "VTZ", city: "Visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh", region: "india" },
  { code: "TRV", city: "Thiruvananthapuram", name: "Trivandrum International", state: "Kerala", region: "india" },
  { code: "CJB", city: "Coimbatore", name: "Coimbatore International", state: "Tamil Nadu", region: "india" },
  { code: "IXE", city: "Mangaluru", name: "Mangaluru International", state: "Karnataka", region: "india" },
  { code: "UDR", city: "Udaipur", name: "Maharana Pratap", state: "Rajasthan", region: "india" },
  { code: "GAY", city: "Gaya", name: "Gaya", state: "Bihar", region: "india" },
  {
    code: "IXZ",
    city: "Port Blair",
    name: "Veer Savarkar International",
    state: "Andaman and Nicobar",
    region: "india",
  },
];

const BY_CODE = new Map(AIRPORTS.map((a) => [a.code, a]));

export function findAirport(code: string | null | undefined): Airport | null {
  if (!code) return null;
  return BY_CODE.get(code.toUpperCase()) ?? null;
}

/** Sectors surfaced as quick picks on the homepage and the search page. */
export const POPULAR_SECTORS: ReadonlyArray<readonly [from: string, to: string]> = [
  ["DEL", "GAU"],
  ["CCU", "GAU"],
  ["BLR", "GAU"],
  ["BOM", "GAU"],
  ["GAU", "DEL"],
  ["DEL", "IXB"],
];
