import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Participant } from "../../utils/types";
import { REGIONS, AREALIST, MEMBERSHIP_ROLE } from "../../utils/global-values";

function Form() {
  // Form fields
  const initialFormState: Participant = {
    id: Date.now().toString(),
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    region: "",
    area: "",
    sfcRole: "SFC+",
    coupleCoordinators: "",
    origin: "",
    arrivalDateTime: "",
    destination: "",
    departureDateTime: "",
    accommodationNeeded: "No",
    fieldOfWork: "",
    shirtSize: "",
    allergies: "",
    emergencyContact: "",
    mediaConsent: false,
  };
  const [formState, setFormState] = useState<Participant>(initialFormState);

  // Logistics
  const [needsRideOnArrival, setNeedsRideOnArrival] = useState<boolean>(false);
  const [needsRideOnDeparture, setNeedsRideOnDeparture] =
    useState<boolean>(false);

  // Input validation output
  const [errors, setErrors] = useState<string[]>([]);

  // Form input handler
  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type, checked } = event.target;

    const inputValue = type === "checkbox" ? checked : value;
    setFormState((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  }

  function getAreas(region: string): string[] {
    switch (region) {
      case "Atlantic (QC, NB, NL, NS, PEI)":
        return AREALIST[0];
      case "Capital (ON)":
        return AREALIST[1];
      case "Central (MB, SK, NU)":
        return AREALIST[2];
      case "Mountain (AB, NWT)":
        return AREALIST[3];
      case "Pacific (BC, YT)":
        return AREALIST[4];
      case "International":
        return AREALIST[5];
      default:
        return [""];
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors: string[] = [];
    if (
      needsRideOnArrival &&
      (formState.arrivalDateTime.includes("Invalid Date") ||
        formState.arrivalDateTime.length === 0)
    ) {
      validationErrors.push("Arrival date and time are required");
    }
    if (
      needsRideOnDeparture &&
      (formState.departureDateTime.includes("Invalid Date") ||
        formState.departureDateTime.length === 0)
    ) {
      validationErrors.push("Departure date and time are required");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      registerClient(formState);
    }
  }

  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router]);

  async function registerClient(params: Participant) {
    try {
      await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      setFormState(initialFormState);
      setErrors([]);
      router.push("/thank-you");
    } catch (e) {
      console.log(e);
    }
  }

  function handleDateTimeParsing(date: Date): string {
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  function onArrivalDateTimeChange(dateValue: any) {
    try {
      if (dateValue && dateValue.toDate()) {
        const arrivalDateTime = handleDateTimeParsing(dateValue.toDate());
        setFormState((prevState) => ({
          ...prevState,
          arrivalDateTime,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  }

  function onDepartureDateTimeChange(dateValue: any) {
    try {
      if (dateValue && dateValue.toDate()) {
        const departureDateTime = handleDateTimeParsing(dateValue.toDate());
        setFormState((prevState) => ({
          ...prevState,
          departureDateTime,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleArrivalTransportation() {
    setNeedsRideOnArrival(!needsRideOnArrival);
    setFormState((prevState) => ({
      ...prevState,
      arrivalDateTime: "",
      origin: "",
    }));
  }

  function handleDepartureTransportation() {
    setNeedsRideOnDeparture(!needsRideOnDeparture);
    setFormState((prevState) => ({
      ...prevState,
      departureDateTime: "",
      destination: "",
    }));
  }

  return (
    <div className="registration">
      <form onSubmit={handleSubmit} className="registration__form">
        <div className="registration__form-field">
          <div>
            <label htmlFor="firstname" className="registration__form-label">
              First name:<span className="required"> *</span>
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formState.firstname}
              onChange={handleInputChange}
              className="registration__form-input focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="lastname" className="registration__form-label">
              Last name: <span className="required"> *</span>
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formState.lastname}
              onChange={handleInputChange}
              className="registration__form-input focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>

        <div className="registration__form-field">
          <div>
            <label htmlFor="email" className="registration__form-label">
              Email:<span className="required"> *</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              className="registration__form-input focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="registration__form-label">
              Phone:<span className="required"> *</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleInputChange}
              className="registration__form-input registration__form-input--short w-40 focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>

        <div className="registration__form-field">
          <div>
            <label htmlFor="region" className="registration__form-label">
              Region:<span className="required"> *</span>
            </label>
            <select
              name="region"
              id="region"
              value={formState.region}
              onChange={handleInputChange}
              className="registration__form-select"
              required
            >
              <option value=""></option>
              {REGIONS.map((region, index) => (
                <option key={index} value={region.value}>
                  {region.text}
                </option>
              ))}
            </select>
          </div>
          {formState.region.length !== 0 &&
            formState.region !== "SFC+" &&
            formState.region !== "Other" && (
              <div>
                <label htmlFor="area" className="registration__form-label">
                  Area:<span className="required"> *</span>
                </label>
                <select
                  name="area"
                  id="area"
                  value={formState.area}
                  onChange={handleInputChange}
                  className="registration__form-select"
                  required
                >
                  <option value=""></option>
                  {getAreas(formState.region).map((area, index) => (
                    <option key={index} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            )}
          {formState.region === "SFC+" && (
            <div>
              <label htmlFor="area" className="registration__form-label">
                City and Province/State:<span className="required"> *</span>
              </label>
              <input
                type="text"
                name="area"
                id="area"
                value={formState.area}
                onChange={handleInputChange}
                className="registration__form-input"
                required
              />
            </div>
          )}
          {formState.region === "Other" && (
            <div>
              <label htmlFor="area" className="registration__form-label">
                City and Province/State:<span className="required"> *</span>
              </label>
              <input
                type="text"
                name="area"
                id="area"
                value={formState.area}
                onChange={handleInputChange}
                className="registration__form-input"
                required
              />
            </div>
          )}
        </div>

        {formState.region.length !== 0 &&
          formState.region !== "SFC+" &&
          formState.region !== "Other" && (
            <div className="registration__form-field">
              <div>
                <label htmlFor="sfcRole" className="registration__form-label">
                  SFC Role/Membership:<span className="required"> *</span>
                </label>
                <select
                  name="sfcRole"
                  id="sfcRole"
                  value={formState.sfcRole}
                  onChange={handleInputChange}
                  className="registration__form-select"
                  required
                >
                  <option value=""></option>
                  {MEMBERSHIP_ROLE.map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="coupleCoordinators"
                  className="registration__form-label"
                >
                  Couple Coordinators:<span className="required"> *</span>
                </label>
                <input
                  type="text"
                  name="coupleCoordinators"
                  id="coupleCoordinators"
                  value={formState.coupleCoordinators}
                  onChange={handleInputChange}
                  className="registration__form-input"
                  required
                />
              </div>
            </div>
          )}

        <section className="py-2">
          <div>
            <label className="flex justify-items-center">
              <span className="pr-2 mb-4">
                Do you need transportation upon your arrival?
              </span>
              <input
                type="checkbox"
                checked={needsRideOnArrival}
                onChange={handleArrivalTransportation}
                className="w-4 h-4"
              />
            </label>
          </div>

          {needsRideOnArrival && (
            <div>
              <div className="registration__form-field--block">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Select your arrival date and time in EST (required)"
                    onChange={onArrivalDateTimeChange}
                    className="registration__form-calendar"
                  />
                </LocalizationProvider>
              </div>
              <div className="registration__form-field--full">
                <div>
                  <label htmlFor="origin" className="registration__form-label">
                    Origin:<span className="required"> *</span>
                  </label>
                  <input
                    type="text"
                    name="origin"
                    id="origin"
                    value={formState.origin}
                    onChange={handleInputChange}
                    className="registration__form-select"
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="pb-2">
          <div>
            <label className="flex justify-items-center">
              <span className="pr-2 mb-4">
                Do you need transportation upon your departure?
              </span>
              <input
                type="checkbox"
                checked={needsRideOnDeparture}
                onChange={handleDepartureTransportation}
                className="w-4 h-4"
              />
            </label>
          </div>

          {needsRideOnDeparture && (
            <div>
              <div className="registration__form-field--block">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Select your departure date and time in EST (required)"
                    onChange={onDepartureDateTimeChange}
                    className="registration__form-calendar"
                  />
                </LocalizationProvider>
              </div>
              <div className="registration__form-field--full">
                <div>
                  <label
                    htmlFor="destination"
                    className="registration__form-label"
                  >
                    Destination:<span className="required"> *</span>
                  </label>
                  <input
                    type="text"
                    name="destination"
                    id="destination"
                    value={formState.destination}
                    onChange={handleInputChange}
                    className="registration__form-select"
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="registration__form-field">
          <div>
            <p className="pb-2">
              Will you need accommodation?<span className="required"> *</span>
            </p>
            <label className="px-4">
              <input
                type="radio"
                name="accommodationNeeded"
                value="Yes"
                checked={formState.accommodationNeeded === "Yes"}
                onChange={handleInputChange}
                className=""
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="accommodationNeeded"
                value="No"
                checked={formState.accommodationNeeded === "No"}
                onChange={handleInputChange}
                className=""
              />
              No
            </label>
          </div>
          <div>
            <label htmlFor="fieldOfWork" className="registration__form-label">
              Field of work:<span className="required"> *</span>
            </label>
            <input
              type="text"
              id="fieldOfWork"
              name="fieldOfWork"
              value={formState.fieldOfWork}
              onChange={handleInputChange}
              className="registration__form-input focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>

        <div className="registration__form-field pt-1">
          <div>
            <label htmlFor="allergies" className="registration__form-label">
              Allergies:<span className="required"> *</span>
            </label>
            <input
              type="text"
              id="allergies"
              name="allergies"
              value={formState.allergies}
              onChange={handleInputChange}
              className="registration__form-input focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="shirtSize" className="registration__form-label">
              Shirt size if you would like to order:
            </label>
            <select
              name="shirtSize"
              id="shirtSize"
              value={formState.shirtSize}
              onChange={handleInputChange}
              className="registration__form-select"
            >
              <option value=""></option>
              <option value="XS">Extra Small</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
              <option value="2XL">Double Extra Large</option>
            </select>
          </div>
        </div>

        <div className="registration__form-field--full pt-1">
          <div>
            <label
              htmlFor="emergencyContact"
              className="registration__form-label"
            >
              Emergency Contact Information:<span className="required"> *</span>
            </label>
            <input
              type="text"
              name="emergencyContact"
              id="emergencyContact"
              value={formState.emergencyContact}
              onChange={handleInputChange}
              className="registration__form-select"
              placeholder="Name and Phone number"
              required
            />
          </div>
        </div>

        <div className="registration__form-field registration__form-field--full">
          <div className="pt-2">
            <p className="text-center font-bold">
              Photography and Video Consent
            </p>
            <p>
              This authorization grants permission to use your image (still or
              moving) and/or your spoken words in perpetuity for educational
              purposes.
            </p>
            <ol className="mt-2 pl-12 pr-4">
              <li>
                To allow the recording of your image and voice (e.g.,
                photographs, audio, or video).
              </li>
              <li>
                To distribute your image or recording in any medium, be it print
                or electronic form, which may include the Internet.
              </li>
              <li>
                To grant permission to other entities to reproduce the images or
                recording for educational purposes.
              </li>
              <li>
                That there is no reimbursement for the right to take, or to use
                your photograph or video or recording.
              </li>
            </ol>
            <label>
              <p className="text-center pt-4">
                I hereby grant my consent as described above.
              </p>
              <input
                type="checkbox"
                id="mediaConsent"
                name="mediaConsent"
                checked={formState.mediaConsent}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="registration__submit-btn rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>

        {errors.length > 0 && (
          <section className="form-validation">
            <span>
              We are unable to submit your registration. Please see and correct
              the following errors:
            </span>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </section>
        )}
      </form>
    </div>
  );
}

export default Form;
