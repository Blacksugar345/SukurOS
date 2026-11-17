export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      aboutme: {
        Row: {
          id?: number
          text: string | null
          latest_update?: string | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
      }
      education: {
        Row: {
          id: number
          title: string | null
          institution: string | null
          yearstart: string | number | null
          gpax?: string | number | null
          description?: string | null
          special?: string | string[] | null
          order?: number | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
      }
      skills: {
        Row: {
          id: number
          name: string
          category: string
          level?: string | null
          special?: string | null
          order?: number | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
      }
      project: {
        Row: {
          id: number
          title: string
          year?: string | number | null
          education_id?: number | string | null
          status?: string | null
          role?: string | null
          description?: string | null
          stack_tags?: string | string[] | null
          skill_id?: string | null
          order?: number | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
      }
      interests: {
        Row: {
          id: number
          title?: string | null
          command_alias?: string | null
          date_update?: string | null
          content?: string | null
          image_urls?: string[] | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
      }
      identity_core: {
        Row: {
          id: number
          first_name?: string | null
          last_name?: string | null
          known_alias?: string | null
          occupation?: string | null
          base_of_operations?: string | null
          date_of_birth?: string | null
          biometric_sex?: string | null
          height_cm?: number | string | null
          weight_kg?: number | string | null
          blood_type?: string | null
          languages?: string[] | null
          image_url?: string | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
      }
      facts: {
        Row: {
          id: number
          title: string
          content: string
          image_urls?: string[] | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
      }
      original_characters: {
        Row: {
          id: number
          fullname: string
          nickname: string
          aliases?: string | null
          species?: string | null
          breed?: string | null
          fur_pattern?: string | null
          age?: number | string | null
          year_birth?: string | number | null
          place_birth?: string | null
          sex?: string | null
          height?: number | string | null
          weight?: number | string | null
          eyes_color?: string | null
          inner_ear_color?: string | null
          nose_color?: string | null
          distinctive?: string | null
          occupation?: string | null
          education?: string | null
          short_desc?: string | null
          backstory?: string | null
          abilities?: string | null
          status?: string | null
          image_url?: string | null
          ref_sheet_url?: string | null
          order?: number | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
      }
      friend_group: {
        Row: {
          id: number
          name: string
          description?: string | null
          meet_since?: string | number | null
          image_url?: string | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
      }
      furcon: {
        Row: {
          id: number
          name: string
          year: number | string
          location?: string | null
          website?: string | null
          furcon_status?: string | null
          status?: string | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
      }
      namecards: {
        Row: {
          id: number
          year: number | string
          version?: string | null
          event_debut?: string | null
          design_concept?: string | null
          front_image_url?: string | null
          back_image_url?: string | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
      }
      gallery: {
        Row: {
          id: number
          title: string
          description?: string | null
          category?: string | null
          date_taken?: string | null
          image_url: string
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
      }
      system_hardware: {
        Row: {
          id: number
          title: string
          content: string
          order_index?: number | null
          [key: string]: any
        }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
      }
      [key: string]: any
    }
    Views: {
      [key: string]: any
    }
    Functions: {
      [key: string]: any
    }
    Enums: {
      [key: string]: any
    }
  }
}
