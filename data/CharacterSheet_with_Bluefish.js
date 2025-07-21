import React, { useState } from 'react';
import './CharacterSheet.css';
import characterData from '../data/RICOPEKA.json';

const CharacterSheet = () => {
  const [selectedCharacter, setSelectedCharacter] = useState('RICO');
  const [activeTab, setActiveTab] = useState('overview');

  const character = characterData.characters[selectedCharacter];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'anatomy', label: 'Anatomy' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'expressions', label: 'Expressions' }
  ];

  const handleCharacterSwitch = (characterName) => {
    setSelectedCharacter(characterName);
    setActiveTab('overview'); // Reset to overview when switching characters
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const renderOverview = () => (
    <div className="character-overview">
      <div className="overview-grid">
        <div className="overview-item">
          <h3>Species</h3>
          <p>{character.species}</p>
        </div>
        <div className="overview-item">
          <h3>Height</h3>
          <p>{character.height}</p>
        </div>
        {character.build && (
          <div className="overview-item">
            <h3>Build</h3>
            <p>{character.build}</p>
          </div>
        )}
        <div className="overview-item">
          <h3>Primary Fur Color</h3>
          <div className="color-display">
            <div 
              className="color-swatch" 
              style={{ backgroundColor: character.fur_color?.primary || character.color_palette?.fur_color?.primary }}
            ></div>
            <span>{character.fur_color?.primary || character.color_palette?.fur_color?.primary}</span>
          </div>
        </div>
        <div className="overview-item">
          <h3>Underbelly Color</h3>
          <div className="color-display">
            <div 
              className="color-swatch" 
              style={{ backgroundColor: character.fur_color?.underbelly || character.color_palette?.fur_color?.underbelly }}
            ></div>
            <span>{character.fur_color?.underbelly || character.color_palette?.fur_color?.underbelly}</span>
          </div>
        </div>
        <div className="overview-item">
          <h3>Eye Color</h3>
          <div className="color-display">
            <div 
              className="color-swatch" 
              style={{ backgroundColor: character.eyes === 'Large, expressive' ? '#8B4513' : character.color_palette?.eyes }}
            ></div>
            <span>{character.eyes === 'Large, expressive' ? 'Brown' : character.color_palette?.eyes}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnatomy = () => (
    <div className="character-anatomy">
      {character.anatomy ? (
        <div className="anatomy-grid">
          {Object.entries(character.anatomy).map(([part, description]) => (
            <div key={part} className="anatomy-item">
              <h4>{part.charAt(0).toUpperCase() + part.slice(1)}</h4>
              <p>{description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="anatomy-simple">
          <div className="anatomy-item">
            <h4>Eyes</h4>
            <p>{character.eyes}</p>
          </div>
          <div className="anatomy-item">
            <h4>Ears</h4>
            <p>{character.ears}</p>
          </div>
          <div className="anatomy-item">
            <h4>Nose</h4>
            <p>{character.nose}</p>
          </div>
          <div className="anatomy-item">
            <h4>Muzzle</h4>
            <p>{character.muzzle}</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderAppearance = () => (
    <div className="character-appearance">
      {character.facial_features && (
        <div className="appearance-section">
          <h3>Facial Features</h3>
          <div className="features-grid">
            {Object.entries(character.facial_features).map(([feature, description]) => (
              <div key={feature} className="feature-item">
                <h4>{feature.charAt(0).toUpperCase() + feature.slice(1)}</h4>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {character.poses_and_expressions && (
        <div className="appearance-section">
          <h3>Primary Pose</h3>
          <p className="primary-pose">{character.poses_and_expressions.primary_pose}</p>
        </div>
      )}
    </div>
  );

  const renderAccessories = () => (
    <div className="character-accessories">
      {character.accessories && (
        <div className="accessories-grid">
          {character.accessories.scarf && (
            <div className="accessory-item">
              <h4>Scarf</h4>
              <p>{character.accessories.scarf}</p>
            </div>
          )}
          {character.accessories.headgear && (
            <div className="accessory-item">
              <h4>Headgear</h4>
              <p>{character.accessories.headgear}</p>
            </div>
          )}
          {character.accessories.props && (
            <div className="accessory-item">
              <h4>Props</h4>
              <ul className="props-list">
                {character.accessories.props.map((prop, index) => (
                  <li key={index}>{prop}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderExpressions = () => (
    <div className="character-expressions">
      <div className="expressions-grid">
        {(character.poses_and_expressions?.expressions || character.expressions || []).map((expression, index) => (
          <div key={index} className="expression-item">
            <span className="expression-name">{expression}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'anatomy':
        return renderAnatomy();
      case 'appearance':
        return renderAppearance();
      case 'accessories':
        return renderAccessories();
      case 'expressions':
        return renderExpressions();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="character-sheet">
      {/* Character Selector */}
      <div className="character-selector">
        <h2>Character Profiles</h2>
        <div className="character-buttons">
          {Object.keys(characterData.characters).map((characterName) => (
            <button
              key={characterName}
              className={`character-btn ${selectedCharacter === characterName ? 'character-btn--active' : ''}`}
              onClick={() => handleCharacterSwitch(characterName)}
            >
              {characterName}
            </button>
          ))}
        </div>
      </div>

      {/* Character Header */}
      <div className="character-sheet__header">
        <div className="character-sheet__avatar">
          <div className="character-sheet__avatar-placeholder">
            {selectedCharacter.charAt(0)}
          </div>
        </div>
        <div className="character-sheet__info">
          <h1 className="character-sheet__name">{selectedCharacter}</h1>
          <div className="character-sheet__details">
            <span className="character-sheet__species">{character.species}</span>
            <span className="character-sheet__height">{character.height}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="character-sheet__nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`character-sheet__tab ${activeTab === tab.id ? 'character-sheet__tab--active' : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="character-sheet__content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CharacterSheet;

