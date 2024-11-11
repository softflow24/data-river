export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      email_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          ip_address: unknown | null
          source: string | null
          status: string
          updated_at: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          ip_address?: unknown | null
          source?: string | null
          status?: string
          updated_at?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          ip_address?: unknown | null
          source?: string | null
          status?: string
          updated_at?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      interests: {
        Row: {
          color: string
          created_at: string
          icon: string
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          color: string
          created_at?: string
          icon: string
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          icon?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      legal_acceptances: {
        Row: {
          accepted_at: string
          document_type: string
          document_version: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          accepted_at?: string
          document_type: string
          document_version: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          accepted_at?: string
          document_type?: string
          document_version?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          city: string | null
          company: string | null
          country: string | null
          created_at: string
          display_name: string | null
          id: string
          job_title: string | null
          timezone: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          job_title?: string | null
          timezone?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          job_title?: string | null
          timezone?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      user_interests: {
        Row: {
          created_at: string
          interest_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          interest_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          interest_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_interests_interest_id_fkey"
            columns: ["interest_id"]
            isOneToOne: false
            referencedRelation: "interests"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_interests: {
        Row: {
          interest_id: string
          workflow_id: string
        }
        Insert: {
          interest_id: string
          workflow_id: string
        }
        Update: {
          interest_id?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_interests_interest_id_fkey"
            columns: ["interest_id"]
            isOneToOne: false
            referencedRelation: "interests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_interests_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_list_items: {
        Row: {
          added_at: string
          list_id: string
          workflow_id: string
        }
        Insert: {
          added_at?: string
          list_id: string
          workflow_id: string
        }
        Update: {
          added_at?: string
          list_id?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_list_items_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "workflow_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_list_items_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_lists: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      workflow_run_counts: {
        Row: {
          count: number | null
          date: string
          workflow_id: string
        }
        Insert: {
          count?: number | null
          date: string
          workflow_id: string
        }
        Update: {
          count?: number | null
          date?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_run_counts_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_runs: {
        Row: {
          completed_at: string
          duration_ms: number
          id: string
          started_at: string
          status: Database["public"]["Enums"]["workflow_run_status"]
          workflow_id: string | null
        }
        Insert: {
          completed_at: string
          duration_ms: number
          id?: string
          started_at?: string
          status: Database["public"]["Enums"]["workflow_run_status"]
          workflow_id?: string | null
        }
        Update: {
          completed_at?: string
          duration_ms?: number
          id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["workflow_run_status"]
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_runs_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          flow_state: Json
          id: string
          is_public: boolean | null
          name: string
          remix_count: number | null
          remixed_from_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          flow_state?: Json
          id?: string
          is_public?: boolean | null
          name: string
          remix_count?: number | null
          remixed_from_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          flow_state?: Json
          id?: string
          is_public?: boolean | null
          name?: string
          remix_count?: number | null
          remixed_from_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflows_remixed_from_id_fkey"
            columns: ["remixed_from_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      user_workflow_stats: {
        Row: {
          public_workflow_count: number | null
          total_workflow_count: number | null
          user_id: string | null
        }
        Relationships: []
      }
      workflow_hourly_stats: {
        Row: {
          avg_duration_ms: number | null
          failed_runs: number | null
          hour: string | null
          successful_runs: number | null
          total_runs: number | null
          workflow_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_runs_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_total_runs: {
        Row: {
          total_runs: number | null
          workflow_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_run_counts_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      has_username: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      increment_run_count: {
        Args: {
          workflow_id: string
        }
        Returns: undefined
      }
      increment_workflow_counter: {
        Args: {
          workflow_id: string
          counter_name: string
        }
        Returns: undefined
      }
      record_workflow_run: {
        Args: {
          p_workflow_id: string
          p_status: Database["public"]["Enums"]["workflow_run_status"]
          p_started_at: string
          p_completed_at: string
        }
        Returns: string
      }
      refresh_workflow_hourly_stats: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      refresh_workflow_total_runs: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      workflow_run_status: "success" | "failure"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

