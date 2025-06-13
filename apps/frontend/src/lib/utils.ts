import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const banks = [
      {
        label: "9mobile 9Payment Service Bank",
        value: "120001",
      },
      {
        label: "Abbey Mortgage Bank",
        value: "404",
      },
      {
        label: "Above Only MFB",
        value: "51204",
      },
      {
        label: "Abulesoro MFB",
        value: "51312",
      },
      {
        label: "Access Bank",
        value: "044",
      },
      {
        label: "Access Bank (Diamond)",
        value: "063",
      },
      {
        label: "Accion Microfinance Bank",
        value: "602",
      },
      {
        label: "AG Mortgage Bank",
        value: "90077",
      },
      {
        label: "Ahmadu Bello University Microfinance Bank",
        value: "50036",
      },
      {
        label: "Airtel Smartcash PSB",
        value: "120004",
      },
      {
        label: "AKU Microfinance Bank",
        value: "51336",
      },
      {
        label: "Akuchukwu Microfinance Bank Limited",
        value: "090561",
      },
      // {
      //   label: "ALAT by WEMA",
      //   value: "035",
      // },
      {
        label: "Amegy Microfinance Bank",
        value: "090629",
      },
      {
        label: "Amju Unique MFB",
        value: "50926",
      },
      {
        label: "AMPERSAND MICROFINANCE BANK",
        value: "51341",
      },
      {
        label: "Aramoko MFB",
        value: "50083",
      },
      {
        label: "ASO Savings and Loans",
        value: "401",
      },
      {
        label: "Astrapolaris MFB LTD",
        value: "50094",
      },
      {
        label: "AVUENEGBE MICROFINANCE BANK",
        value: "090478",
      },
      {
        label: "AWACASH MICROFINANCE BANK",
        value: "51351",
      },
      {
        label: "Bainescredit MFB",
        value: "51229",
      },
      {
        label: "Banc Corp Microfinance Bank",
        value: "50117",
      },
      {
        label: "Baobab Microfinance Bank",
        value: "50992",
      },
      {
        label: "BellBank Microfinance Bank",
        value: "51100",
      },
      {
        label: "Benysta Microfinance Bank Limited",
        value: "51267",
      },
      {
        label: "Beststar Microfinance Bank",
        value: "50123",
      },
      {
        label: "Bowen Microfinance Bank",
        value: "50931",
      },
      {
        label: "Branch International Financial Services Limited",
        value: "40163",
      },
      {
        label: "Carbon",
        value: "565",
      },
      {
        label: "Cashbridge Microfinance Bank Limited",
        value: "51353",
      },
      {
        label: "CASHCONNECT MFB",
        value: "865",
      },
      {
        label: "CEMCS Microfinance Bank",
        value: "50823",
      },
      {
        label: "Chanelle Microfinance Bank Limited",
        value: "50171",
      },
      {
        label: "Chikum Microfinance bank",
        value: "312",
      },
      {
        label: "Citibank Nigeria",
        value: "023",
      },
      {
        label: "CITYvalue MORTAGE BANK",
        value: "070027",
      },
      {
        label: "Consumer Microfinance Bank",
        value: "50910",
      },
      {
        label: "Corestep MFB",
        value: "50204",
      },
      {
        label: "Coronation Merchant Bank",
        value: "559",
      },
      {
        label: "County Finance Limited",
        value: "40128",
      },
      {
        label: "Crescent MFB",
        value: "51297",
      },
      {
        label: "Crust Microfinance Bank",
        value: "090560",
      },
      {
        label: "Davenport MICROFINANCE BANK",
        value: "51334",
      },
      {
        label: "Dot Microfinance Bank",
        value: "50162",
      },
      {
        label: "Ecobank Nigeria",
        value: "050",
      },
      {
        label: "Ekimogun MFB",
        value: "50263",
      },
      {
        label: "Ekondo Microfinance Bank",
        value: "098",
      },
      {
        label: "EXCEL FINANCE BANK",
        value: "090678",
      },
      {
        label: "Eyowo",
        value: "50126",
      },
      {
        label: "Fairmoney Microfinance Bank",
        value: "51318",
      },
      {
        label: "Fedeth MFB",
        value: "50298",
      },
      {
        label: "Fidelity Bank",
        value: "070",
      },
      {
        label: "Firmus MFB",
        value: "51314",
      },
      {
        label: "First Bank of Nigeria",
        value: "011",
      },
      {
        label: "First City Monument Bank",
        value: "214",
      },
      {
        label: "FIRST ROYAL MICROFINANCE BANK",
        value: "090164",
      },
      {
        label: "FirstTrust Mortgage Bank Nigeria",
        value: "413",
      },
      {
        label: "FLOURISH MFB",
        value: "50315",
      },
      {
        label: "FSDH Merchant Bank Limited",
        value: "501",
      },
      {
        label: "FUTMINNA MICROFINANCE BANK",
        value: "832",
      },
      {
        label: "Gateway Mortgage Bank LTD",
        value: "812",
      },
      {
        label: "Globus Bank",
        value: "00103",
      },
      {
        label: "Goldman MFB",
        value: "090574",
      },
      {
        label: "GoMoney",
        value: "100022",
      },
      {
        label: "GOOD SHEPHERD MICROFINANCE BANK",
        value: "090664",
      },
      {
        label: "Goodnews Microfinance Bank",
        value: "50739",
      },
      {
        label: "Greenwich Merchant Bank",
        value: "562",
      },
      {
        label: "Guaranty Trust Bank",
        value: "058",
      },
      {
        label: "Hackman Microfinance Bank",
        value: "51251",
      },
      {
        label: "Hasal Microfinance Bank",
        value: "50383",
      },
      {
        label: "HopePSB",
        value: "120002",
      },
      {
        label: "Ibile Microfinance Bank",
        value: "51244",
      },
      {
        label: "Ikoyi Osun MFB",
        value: "50439",
      },
      {
        label: "Ilaro Poly Microfinance Bank",
        value: "50442",
      },
      {
        label: "Imowo MFB",
        value: "50453",
      },
      {
        label: "IMPERIAL HOMES MORTAGE BANK",
        value: "415",
      },
      {
        label: "Infinity MFB",
        value: "50457",
      },
      {
        label: "Jaiz Bank",
        value: "301",
      },
      {
        label: "Kadpoly MFB",
        value: "50502",
      },
      {
        label: "KANOPOLY MFB",
        value: "51308",
      },
      {
        label: "Keystone Bank",
        value: "082",
      },
      {
        label: "KONGAPAY (Kongapay Technologies Limited)(formerly Zinternet)",
        value: "100025",
      },
      {
        label: "Kredi Money MFB LTD",
        value: "50200",
      },
      {
        label: "Kuda Bank",
        value: "50211",
      },
      {
        label: "Lagos Building Investment Company Plc.",
        value: "90052",
      },
      {
        label: "Links MFB",
        value: "50549",
      },
      {
        label: "Living Trust Mortgage Bank",
        value: "031",
      },
      {
        label: "LOMA MFB",
        value: "50491",
      },
      {
        label: "Lotus Bank",
        value: "303",
      },
      {
        label: "MAINSTREET MICROFINANCE BANK",
        value: "090171",
      },
      {
        label: "Mayfair MFB",
        value: "50563",
      },
      {
        label: "Mint MFB",
        value: "50304",
      },
      {
        label: "Money Master PSB",
        value: "946",
      },
      {
        label: "Moniepoint MFB",
        value: "50515",
      },
      {
        label: "MTN Momo PSB",
        value: "120003",
      },
      {
        label: "MUTUAL BENEFITS MICROFINANCE BANK",
        value: "090190",
      },
      {
        label: "NDCC MICROFINANCE BANK",
        value: "090679",
      },
      {
        label: "NET MICROFINANCE BANK",
        value: "51361",
      },
      {
        label: "Nigerian Navy Microfinance Bank Limited",
        value: "51142",
      },
      {
        label: "NPF MICROFINANCE BANK",
        value: "50629",
      },
      {
        label: "OPay Digital Services Limited (OPay)",
        value: "999992",
      },
      {
        label: "Optimus Bank Limited",
        value: "107",
      },
      {
        label: "Paga",
        value: "100002",
      },
      {
        label: "PalmPay",
        value: "999991",
      },
      {
        label: "Parallex Bank",
        value: "104",
      },
      {
        label: "Parkway - ReadyCash",
        value: "311",
      },
      {
        label: "PATHFINDER MICROFINANCE BANK LIMITED",
        value: "090680",
      },
      {
        label: "Paystack-Titan",
        value: "100039",
      },
      {
        label: "Peace Microfinance Bank",
        value: "50743",
      },
      {
        label: "PECANTRUST MICROFINANCE BANK LIMITED",
        value: "51226",
      },
      {
        label: "Personal Trust MFB",
        value: "51146",
      },
      {
        label: "Petra Mircofinance Bank Plc",
        value: "50746",
      },
      {
        label: "PFI FINANCE COMPANY LIMITED",
        value: "050021",
      },
      {
        label: "Platinum Mortgage Bank",
        value: "268",
      },
      {
        label: "Pocket App",
        value: "00716",
      },
      {
        label: "Polaris Bank",
        value: "076",
      },
      {
        label: "Polyunwana MFB",
        value: "50864",
      },
      {
        label: "PremiumTrust Bank",
        value: "105",
      },
      {
        label: "PROSPERIS FINANCE LIMITED",
        value: "050023",
      },
      {
        label: "Providus Bank",
        value: "101",
      },
      {
        label: "QuickFund MFB",
        value: "51293",
      },
      {
        label: "Rand Merchant Bank",
        value: "502",
      },
      {
        label: "RANDALPHA MICROFINANCE BANK",
        value: "090496",
      },
      {
        label: "Refuge Mortgage Bank",
        value: "90067",
      },
      {
        label: "REHOBOTH MICROFINANCE BANK",
        value: "50761",
      },
      {
        label: "Rephidim Microfinance Bank",
        value: "50994",
      },
      {
        label: "Rigo Microfinance Bank Limited",
        value: "51286",
      },
      {
        label: "ROCKSHIELD MICROFINANCE BANK",
        value: "50767",
      },
      {
        label: "Rubies MFB",
        value: "125",
      },
      {
        label: "Safe Haven MFB",
        value: "51113",
      },
      {
        label: "Safe Haven Microfinance Bank Limited",
        value: "951113",
      },
      {
        label: "SAGE GREY FINANCE LIMITED",
        value: "40165",
      },
      {
        label: "Shield MFB",
        value: "50582",
      },
      {
        label: "Signature Bank Ltd",
        value: "106",
      },
      {
        label: "Solid Allianze MFB",
        value: "51062",
      },
      {
        label: "Solid Rock MFB",
        value: "50800",
      },
      {
        label: "Sparkle Microfinance Bank",
        value: "51310",
      },
      {
        label: "Stanbic IBTC Bank",
        value: "221",
      },
      {
        label: "Standard Chartered Bank",
        value: "068",
      },
      {
        label: "STANFORD MICROFINANCE BANK",
        value: "090162",
      },
      {
        label: "STATESIDE MICROFINANCE BANK",
        value: "50809",
      },
      {
        label: "Stellas MFB",
        value: "51253",
      },
      {
        label: "Sterling Bank",
        value: "232",
      },
      {
        label: "Suntrust Bank",
        value: "100",
      },
      {
        label: "Supreme MFB",
        value: "50968",
      },
      {
        label: "TAJ Bank",
        value: "302",
      },
      {
        label: "Tangerine Money",
        value: "51269",
      },
      {
        label: "TCF MFB",
        value: "51211",
      },
      {
        label: "Titan Bank",
        value: "102",
      },
      {
        label: "U&C Microfinance Bank Ltd (U AND C MFB)",
        value: "50840",
      },
      {
        label: "Uhuru MFB",
        value: "51322",
      },
      {
        label: "Unaab Microfinance Bank Limited",
        value: "50870",
      },
      {
        label: "Unical MFB",
        value: "50871",
      },
      {
        label: "Unilag Microfinance Bank",
        value: "51316",
      },
      {
        label: "Union Bank of Nigeria",
        value: "032",
      },
      {
        label: "United Bank For Africa",
        value: "033",
      },
      {
        label: "Unity Bank",
        value: "215",
      },
      {
        label: "Uzondu Microfinance Bank Awka Anambra State",
        value: "50894",
      },
      {
        label: "Vale Finance Limited",
        value: "050020",
      },
      {
        label: "VFD Microfinance Bank Limited",
        value: "566",
      },
      {
        label: "Waya Microfinance Bank",
        value: "51355",
      },
      {
        label: "Wema Bank",
        value: "035",
      },
      {
        label: "Zenith Bank",
        value: "057",
      },
    ]

export function getDaysBetweenDates(deadlineDate:string) {
  const today= new Date();
  const deadline = new Date(deadlineDate);

  // Zero out the time components to avoid partial days
  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Avoid showing negative days
  return diffDays > 0 ? diffDays : 0;
}