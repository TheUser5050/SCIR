"use client"
import React, { useState, useEffect, useRef } from 'react';
import { CameraIcon, MapPinIcon, GlobeAltIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

// Define the shape of our location state
interface LocationState {
  lat: number | null;
  lng: number | null;
  address: string;
  isLocating: boolean;
  error: string | null;
}

// Define the shape of our submission state
interface SubmissionState {
  isSubmitted: boolean;
  isSubmitting: boolean;
  issueId: number | null;
  submitError: string | null;
}

const IssueReportForm: React.FC = () => {
  // Location State
  const [location, setLocation] = useState<LocationState>({
    lat: null,
    lng: null,
    address: 'Fetching location...',
    isLocating: true,
    error: null,
  });

  // Form Data State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
  });

  // Submission Status State
  const [submission, setSubmission] = useState<SubmissionState>({
    isSubmitted: false,
    isSubmitting: false,
    issueId: null,
    submitError: null,
  });

  // Image Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  // --- Geocoding Logic (Unchanged) ---
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({ ...prev, error: 'Geolocation is not supported.', isLocating: false, address: 'Geolocation unavailable.' }));
      return;
    }

    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

      fetch(nominatimUrl)
        .then(res => res.json())
        .then(data => {
          const fetchedAddress = data.display_name || `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
          setLocation({ lat: latitude, lng: longitude, address: fetchedAddress, isLocating: false, error: null });
        })
        .catch(err => {
          console.error("Geocoding failed:", err);
          setLocation({ lat: latitude, lng: longitude, address: `Could not determine address. Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`, isLocating: false, error: 'Failed to find address.' });
        });
    };

    const error = (err: GeolocationPositionError) => {
      const msg = err.code === 1 ? "Location access denied by user." : "Failed to retrieve location.";
      setLocation(prev => ({ ...prev, error: msg, isLocating: false, address: msg }));
    };

    navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true, timeout: 10000 });
  }, []);

  // --- Image Handling (Unchanged) ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setImagePreviewUrl(null);
    }
  };

  const clearImagePreview = () => {
    setSelectedFile(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // --- Form Input Handler (Unchanged) ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // --- Submission Logic (UPDATED FOR /api/saveIssue) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (location.error || !location.lat || !location.lng || !selectedFile) {
      setSubmission(prev => ({ ...prev, submitError: "Please ensure location is set and a photo is uploaded." }));
      return;
    }

    setSubmission({ ...submission, isSubmitting: true, submitError: null });

    // In a real app, you would typically upload the file first and get a URL,
    // then send the URL and form data to the backend in one JSON payload.
    // For now, we are simulating the final JSON payload structure.
    const dataToSubmit = {
      ...formData,
      latitude: location.lat,
      longitude: location.lng,
      // Placeholder for image URL after cloud upload
      image_url: `MOCK_URL_FOR_${selectedFile.name}`,
    };

    console.log("Submitting Report to /api/saveIssue:", dataToSubmit);

    // --- REAL API CALL TO /api/saveIssue ---
    try {
      const response = await fetch('/api/saveIssue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      // Check if the response status is 200-299
      if (!response.ok) {
        // Attempt to parse error message from server
        const errorData = await response.json().catch(() => ({ message: 'Server responded with error status.' }));
        throw new Error(errorData.message || 'Submission failed.');
      }

      const data = await response.json();

      setSubmission({
        isSubmitted: true,
        isSubmitting: false,
        // Assuming the backend returns the new ID in a field named 'new_issue_id'
        issueId: data.new_issue_id || null,
        submitError: null,
      });

    } catch (error) {
      // Handle network errors or specific errors thrown above
      const errorMessage = error instanceof Error ? error.message : 'A general network error occurred.';
      console.error("Submission failed:", error);
      setSubmission(prev => ({
        ...prev,
        isSubmitting: false,
        submitError: errorMessage
      }));
    }
  };

  const isFormDisabled = location.isLocating || submission.isSubmitting;

  // --- Success Message Component (Unchanged) ---
  const SuccessCard = () => (
    <div className="bg-green-50 p-8 rounded-xl shadow-2xl border-4 border-green-300 text-center max-w-xl mx-auto space-y-4">
      <CheckCircleIcon className="w-16 h-16 text-green-600 mx-auto" />
      <h2 className="text-3xl font-bold text-green-800">Report Submitted!</h2>
      <p className="text-xl text-gray-700">
        Thank you for reporting this issue to your city.
      </p>
      {submission.issueId && (
        <p className="text-2xl font-extrabold text-blue-600 bg-white p-3 inline-block rounded-lg border-2 border-blue-200 shadow-md">
          Issue ID: #{submission.issueId}
        </p>
      )}
      <p className="text-gray-600">
        You can use this ID to track the status of your report.
      </p>
      <button
        onClick={() => setSubmission({ isSubmitted: false, isSubmitting: false, issueId: null, submitError: null })}
        className="mt-4 w-full py-3 px-4 text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-150"
      >
        File Another Report
      </button>
    </div>
  );

  // --- Main Render ---
  return (
    <div className="max-w-xl mx-auto p-4 md:p-8 font-sans">

      {submission.isSubmitted ? (
        <SuccessCard />
      ) : (
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-2xl border border-gray-100 space-y-6">

          <h2 className="text-3xl font-bold text-gray-800">
            Report a New Civic Issue
          </h2>

          {/* Submission Error Alert */}
          {submission.submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-sm" role="alert">
              <span className="block sm:inline">{submission.submitError}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Location Display */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <label className="block text-sm font-medium text-blue-700 mb-1">
                <MapPinIcon className="h-5 w-5 inline-block mr-1" />
                Issue Location
              </label>
              <div className={`text-gray-800 font-semibold text-lg ${location.isLocating || location.error ? 'animate-pulse text-red-500' : ''}`}>
                {location.isLocating ? (
                  <GlobeAltIcon className="h-5 w-5 inline-block mr-2 animate-spin" />
                ) : null}
                {location.address}
              </div>
              {location.error && (
                <p className="text-xs text-red-600 mt-1">{location.error}</p>
              )}
            </div>

            {/* Form Fields (Title, Category, Description) */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Issue Title</label>
              <input type="text" id="title" value={formData.title} onChange={handleInputChange} placeholder="Enter a descriptive title" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900" required disabled={isFormDisabled} />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select id="category" value={formData.category} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900" required disabled={isFormDisabled}>
                <option value="">Select a category</option>
                <option value="road_hazard">Road Hazard</option>
                <option value="street_light">Street Light Outage</option>
                <option value="signage">Missing Signage</option>
                <option value="graffiti">Graffiti</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
              <textarea id="description" rows={4} value={formData.description} onChange={handleInputChange} placeholder="Describe the issue, its severity, and any hazards." className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900" disabled={isFormDisabled}></textarea>
            </div>
            {/* --- End Form Fields --- */}


            {/* Photo Upload with Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo Evidence (Required)
              </label>
              <div className="relative w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden group">
                {imagePreviewUrl ? (
                  <>
                    <img src={imagePreviewUrl} alt="Issue Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={clearImagePreview}
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label="Remove image"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <label
                    htmlFor="photo-upload"
                    className={`flex flex-col items-center justify-center w-full h-full cursor-pointer transition duration-150
                      ${isFormDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-50 hover:bg-gray-100 text-gray-500'}
                      ${isFormDisabled ? 'border-gray-200' : 'border-gray-300'}
                    `}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <CameraIcon className="w-8 h-8" />
                      <p className="mb-2 text-sm">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs">JPEG, PNG (Max 5MB)</p>
                    </div>
                    <input
                      id="photo-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                      disabled={isFormDisabled}
                      ref={fileInputRef}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg shadow-sm transition duration-150
                ${isFormDisabled || !selectedFile ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}
              `}
              disabled={isFormDisabled || !selectedFile}
            >
              {submission.isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : location.isLocating ? 'Determining Location...' : 'Submit Issue Report'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default IssueReportForm;

