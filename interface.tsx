export interface User {
  id: number;
  type: string;
  attributes: Attributes;
}

export interface Attributes {
    id: number;
    username: string;
    email: string;
    profilePhoto: string;
    settings: {
      workTime: number;
      longPomTime: number;
      shortPomTime: number;
    };
    projects: [
      {
        id: number;
        projectName: string;
        projectPet: string;
        petHealth: number;
        petLevel: number;
        projectGitHub: string;
        petImage: string;
        stats: {
          totalWorkTime: number;
          totalLongPomTime: number;
          totalLongSessions: number;
          totalShortPomTime: number;
          totalWorkSessions: number;
          totalShortSessions: number;
        };
        created_at: string;
        updated_at: string;
        user_id: number;
      }
    ];
  };


