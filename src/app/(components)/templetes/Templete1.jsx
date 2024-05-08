'use client';
import React, { useEffect } from 'react';
import { useBasicInfo } from '../../(context)/basicInfoContext';
import { useContact } from '../../(context)/contactContext';
import { useEducationContext } from '../../(context)/educationContext';
import { useExperience } from '../../(context)/experienceContext';
import { useLanguages } from '../../(context)/languagesContext';
import { useProfileContext } from '../../(context)/profileContext';
import { useReferenceContext } from '../../(context)/referenceContext';
import { useSkillContext } from '../../(context)/skillContext';
import DownloadButton from '../ui-components/DownloadBtn'; // Import the DownloadButton component

function Templete1() {
  const { basicInfo, fetchBasicInfo } = useBasicInfo();
  const { contacts, fetchContacts } = useContact();
  const { educationEntries, fetchEducationEntries } = useEducationContext();
  const { experiences, fetchExperiences } = useExperience();
  const { languages, fetchLanguages } = useLanguages();
  const { profiles, fetchProfiles } = useProfileContext();
  const { referenceEntries, fetchReferenceEntries } = useReferenceContext();
  const { skills, fetchSkills } = useSkillContext();

  useEffect(() => {
    // Fetch basic info
    fetchBasicInfo();

    // Fetch contact info
    fetchContacts();

    // Fetch education entries
    fetchEducationEntries();

    // Fetch experiences
    fetchExperiences();

    // Fetch languages
    fetchLanguages();

    // Fetch profiles
    fetchProfiles();

    // Fetch reference entries
    fetchReferenceEntries();

    // Fetch skills
    fetchSkills();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-serif italic font-bold mb-4 text-center  pt-20 text-blue-500">
        {basicInfo?.cv_name}
      </h1>
      <div className="  rounded-lg " id="content">
        <div className="grid grid-cols-2 shadow-md rounded-lg  ">
          {/* Left Column */}
          <div className="bg-white p-8 ">
            {/* Basic Info */}
            {basicInfo && (
              <div className="mb-5">
                <div className="flex items-center justify-center mb-2">
                  <img
                    src={`data:image/png;base64,${basicInfo.image_data}`}
                    alt="User"
                    className="w-24 h-24 rounded-full"
                  />
                </div>
                <div className="text-center pt-2">
                  <h2 className="text-xl font-serif italic font-bold mb-2">
                    {basicInfo.first_name} {basicInfo.last_name}
                  </h2>
                  <p className="text-lg font-serif font-semibold text-gray-800 mb-2">
                    {basicInfo.job_title}
                  </p>
                  <div className="text-sm text-left font-serif text-gray-800 ">
                    <p className="mb-1">
                      <span className="text-md font-semibold  text-right mr-4">
                        Date of Birth:
                      </span>
                      {basicInfo.date_of_birth}
                    </p>
                    <p className="mb-1">
                      <span className="text-md font-semibold  text-right mr-4">
                        Nationality:
                      </span>
                      {basicInfo.nationality}
                    </p>
                    <p className="mb-1">
                      <span className="text-md font-semibold  text-right mr-4">
                        ID / Passport :
                      </span>
                      {basicInfo.passport_id}
                    </p>
                    <p className="mb-1">
                      <span className="text-md font-semibold  text-right mr-4">
                        Gender:
                      </span>
                      {basicInfo.gender}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Information */}
            {contacts.map((contact) => (
              <div key={contact.id} className="mb-4 ">
                <h3 className="text-xl italic font-serif p-2 font-bold mb-2 bg-gray-200 flex justify-center items-center">
                  Contact Information
                </h3>
                <div className="text-sm font-serif text-gray-800">
                  <p className="mb-1">
                    <span className="text-md font-semibold mb-2  mr-4">
                      Email:
                    </span>
                    {contact.cv_email}
                  </p>
                  <p className="mb-1">
                    <span className="text-md  font-semibold mb-2 mr-4">
                      Phone:
                    </span>
                    {contact.phone}
                  </p>
                  <p className="mb-1">
                    <span className="text-md font-semibold mb-2 mr-4">
                      Address:
                    </span>
                    {contact.address}
                  </p>

                  <div className="flex justify-between flex-col-2 pt-2">
                    <div className="flex flex-col">
                      <span className="text-md font-semibold mb-1 underline">
                        Platform :
                      </span>
                      {contact.platform_name
                        .split(',')
                        .map((platform, index) => (
                          <a
                            key={index}
                            href={contact.social_links.split(',')[index]} // Use the corresponding link
                            target="_blank" // Open link in a new tab
                            rel="noopener noreferrer" // Recommended for security reasons
                            className="text-gray-800 font-bold mb-2 text-sm hover:underline"
                          >
                            {platform}
                          </a>
                        ))}
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-md font-bold mb-1 underline i">
                        Links:
                      </span>
                      {contact.social_links.split(',').map((link, index) => (
                        <div key={index} className="flex justify-end mb-2">
                          <a
                            href={link}
                            target="_blank" // Open link in a new tab
                            rel="noopener noreferrer" // Recommended for security reasons
                            className="text-blue-500 hover:underline"
                          >
                            {link}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Languages */}
            <div className="mb-4 font-serif">
              <h3 className="text-xl italic font-serif p-2 font-bold mb-2 bg-gray-200 flex justify-center items-center">
                Languages
              </h3>
              {languages &&
                languages.map((language, index) => (
                  <div key={index} className="text-gray-800 mb-1">
                    <ul>
                      <p className="mb-1 text-lg italic font-bold  mr-2">
                        {language.language}
                      </p>
                      <p className="mb-1">
                        <span className="text-sm font-semibold mb-1 mr-2">
                          Language Level:
                        </span>
                        {language.language_level}
                      </p>
                      <p className="mb-2">{language.additional_info}</p>
                    </ul>
                  </div>
                ))}
            </div>
            {/* Profiles */}
            <div className="mb-2 font-serif">
              <h2 className="text-xl p-2 italic font-bold mb-2 bg-gray-200 flex justify-center items-center">
                Profile
              </h2>
              <div className="text-gray-800">
                {profiles &&
                  profiles.map((profile, index) => (
                    <p key={index} className="mb-2">
                      {profile.description}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white p-4 px-8 ">
            {/* Education */}
            <div className="mb-4 font-serif ">
              <h2 className="text-xl italic font-bold font-serif p-2 mb-2 bg-gray-200 flex justify-center items-center">
                Education
              </h2>
              {educationEntries &&
                educationEntries.map((education, index) => (
                  <div key={index} className="text-gray-800">
                    <ul className="list-disc list-inside">
                      <p className="mb-1 text-md font-semibold">
                        {education.course_title}
                      </p>
                      <p className="mb-1  text-sm">
                        {education.institution} || {education.city},
                        {education.country}
                      </p>
                      <p className="mb-1 text-sm">
                        {new Date(education.start_date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                        -
                        {new Date(education.end_date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </p>

                      <p className="mb-2 text-sm"> {education.description}</p>
                    </ul>
                  </div>
                ))}
            </div>

            {/* Experience */}
            <div className="mb-4 font-serif ">
              <h2 className="text-xl italic p-2 font-bold mb-2 bg-gray-200 flex justify-center items-center">
                Experience
              </h2>
              {experiences &&
                experiences.map((experience, index) => (
                  <div key={index} className="text-gray-800">
                    <ol>
                      <p className="mb-1 italic text-md font-semibold">
                        {experience.employer} ||{' '}
                        <span className="font-thin">
                          {new Date(experience.start_date).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                          -
                          {new Date(experience.end_date).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                        </span>
                      </p>
                      <p className="mb-1 italic font-thin text-sm">
                        {' '}
                        {experience.job_title}
                        <span className="mb-1 ml-1 font-thin text-md">
                          || {experience.city}, {experience.country}
                        </span>
                      </p>

                      <p className="mb-1 text-sm"></p>
                      <p className="mb-1 text-sm">{experience.description}</p>
                    </ol>
                  </div>
                ))}
            </div>

            {/* Skills */}
            <div className="mb-4 font-serif">
              <h2 className="text-xl italic font-serif p-2 font-bold mb-2 bg-gray-200 flex justify-center items-center">
                Skills
              </h2>
              {skills &&
                skills.map((skill, index) => (
                  <div key={index} className="text-gray-800 mb-1">
                    <ul>
                      <p className="mb-1 text-md italic font-semibold">
                        {skill.skill} ||
                        <span className="mb-1 font-thin text-sm ml-1">
                          {skill.skill_level}
                        </span>
                      </p>

                      <p className="mb-1 text-sm"> {skill.info}</p>
                    </ul>
                  </div>
                ))}
            </div>

            {/* References */}
            <div className="font-serif mb-15">
              <h2 className="text-xl italic  p-2 font-bold mb-2 bg-gray-200 flex justify-center items-center">
                References
              </h2>
              {referenceEntries &&
                referenceEntries.map((reference, index) => (
                  <div key={index} className="text-gray-800 mb-1">
                    <ul>
                      <p className="mb-1 text-sm italic font-semibold">
                        {reference.name} ||
                        <span className="mb-1 ml-1 text-sm font-thin">
                          {reference.job_title}
                        </span>
                      </p>
                      <p className="mb-1 text-sm">{reference.organization}</p>
                      <p className="mb-1 text-sm mr-1">
                        {reference.email} ,
                        <span className="ml-1 mb-2 text-sm">
                          {reference.phone}
                        </span>
                      </p>
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <DownloadButton content="content" />
      </div>
    </div>
  );
}

export default Templete1;