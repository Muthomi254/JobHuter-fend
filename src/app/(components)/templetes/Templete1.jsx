"use client";
import React, { useEffect } from 'react';
import { useBasicInfo } from '../../(context)/basicInfoContext';
import { useContact } from '../../(context)/contactContext';
import { useEducationContext } from '../../(context)/educationContext';
import { useExperience } from '../../(context)/experienceContext';
import { useLanguages } from '../../(context)/languagesContext';
import { useProfileContext } from '../../(context)/profileContext';
import { useReferenceContext } from '../../(context)/referenceContext';
import { useSkillContext } from '../../(context)/skillContext';

function Template() {
  const { basicInfo, fetchBasicInfo } = useBasicInfo();
  const { contact, fetchContacts } = useContact();
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
    <div className="bg-white p-8 shadow-md rounded-lg">
      {/* Render basic info */}
      {basicInfo && (
        <>
          <div className="flex justify-center">
            <img
              src={`data:image/png;base64,${basicInfo.image_data}`}
              alt="User"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <div className="text-center mt-4">
            <h1 className="text-3xl font-bold">
              {basicInfo.first_name} {basicInfo.last_name}
            </h1>
            <p className="text-lg text-gray-800">{basicInfo.job_title}</p>
          </div>
        </>
      )}
      {/* Render contact info */}
      {contact && (
        <div className="mt-4">
          <p className="text-gray-800">Email: {contact.cv_email}</p>
          <p className="text-gray-800">Phone: {contact.phone}</p>
          <p className="text-gray-800">Address: {contact.address}</p>
          <div className="flex flex-wrap mt-2">
            {contact.platform_name &&
              contact.platform_name.split(',').map((platform, index) => (
                <span key={index} className="text-gray-800 mr-2">
                  {platform}
                </span>
              ))}
          </div>
          <div className="flex flex-wrap mt-2">
            {contact.social_links &&
              contact.social_links.split(',').map((link, index) => (
                <a
                  key={index}
                  href={link}
                  className="text-blue-500 hover:underline mr-2"
                >
                  {link}
                </a>
              ))}
          </div>
        </div>
      )}
      {/* Render education */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Education</h2>
        {educationEntries &&
          educationEntries.map((education, index) => (
            <div key={index}>
              <p className="text-gray-800">Course: {education.course_title}</p>
              <p className="text-gray-800">
                Institution: {education.institution}
              </p>
              <p className="text-gray-800">
                Location: {education.city}, {education.country}
              </p>
              <p className="text-gray-800">
                Start Date:{' '}
                {new Date(education.start_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-gray-800">
                End Date:{' '}
                {new Date(education.end_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-gray-800 mt-2">
                Description: {education.description}
              </p>
            </div>
          ))}
      </div>
      {/* Render experience */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Experience</h2>
        {experiences &&
          experiences.map((experience, index) => (
            <div key={index}>
              <p className="text-gray-800">Job Title: {experience.job_title}</p>
              <p className="text-gray-800">Employer: {experience.employer}</p>
              <p className="text-gray-800">
                Location: {experience.city}, {experience.country}
              </p>
              <p className="text-gray-800">
                Start Date:{' '}
                {new Date(experience.start_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-gray-800">
                End Date:{' '}
                {new Date(experience.end_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-gray-800 mt-2">
                Description: {experience.description}
              </p>
            </div>
          ))}
      </div>
      {/* Render languages */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Languages</h2>
        {languages &&
          languages.map((language, index) => (
            <div key={index}>
              <p className="text-gray-800">Language: {language.language}</p>
              <p className="text-gray-800">
                Language Level: {language.language_level}
              </p>
              <p className="text-gray-800 mt-2">
                Additional Info: {language.additional_info}
              </p>
            </div>
          ))}
      </div>
      {/* Render profile */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Profile</h2>
        {profiles &&
          profiles.map((profile, index) => (
            <p key={index} className="text-gray-800">
              {profile.description}
            </p>
          ))}
      </div>
      {/* Render references */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">References</h2>
        {referenceEntries &&
          referenceEntries.map((reference, index) => (
            <div key={index}>
              <p className="text-gray-800">Name: {reference.name}</p>
              <p className="text-gray-800">Job Title: {reference.job_title}</p>
              <p className="text-gray-800">
                Organization: {reference.organization}
              </p>
              <p className="text-gray-800">Email: {reference.email}</p>
              <p className="text-gray-800">Phone: {reference.phone}</p>
            </div>
          ))}
      </div>
      {/* Render skills */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Skills</h2>
        {skills &&
          skills.map((skill, index) => (
            <div key={index}>
              <p className="text-gray-800">Skill: {skill.skill}</p>
              <p className="text-gray-800">Skill Level: {skill.skill_level}</p>
              <p className="text-gray-800">Info: {skill.info}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Template;
