export type NamedBarber = { name: string };

const workingHoursPattern =
  /^(?:Closed|(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?:-(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun))?,\s(?:1[0-2]|[1-9]):[0-5][0-9]\s(?:AM|PM)-(?:1[0-2]|[1-9]):[0-5][0-9]\s(?:AM|PM))$/;

export function isValidWorkingHours(value: unknown): value is string {
  return typeof value === "string" && workingHoursPattern.test(value.trim());
}

export function findBarberByName<T extends NamedBarber>(barbers: T[], name: string): T | undefined {
  const normalizedName = name.trim().toLocaleLowerCase();

  return barbers.find((barber) => barber.name.toLocaleLowerCase() === normalizedName);
}
