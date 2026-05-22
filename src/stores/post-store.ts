import { create } from "zustand";
import type { Post } from "@/types";

// ============================================================================
// Post Draft Store (for editor state)
// ============================================================================

interface PostDraft {
  title: string;
  content: string;
  tags: string[];
  published: boolean;
}

interface PostDraftState {
  drafts: Record<string, PostDraft>;
}

interface PostDraftActions {
  setDraft: (postId: string, draft: PostDraft) => void;
  getDraft: (postId: string) => PostDraft | null;
  removeDraft: (postId: string) => void;
  clearAllDrafts: () => void;
}

export const usePostDraftStore = create<PostDraftState & PostDraftActions>()((set, get) => ({
  // Initial state
  drafts: {},

  // Actions
  setDraft: (postId, draft) =>
    set((state) => ({
      drafts: { ...state.drafts, [postId]: draft },
    })),

  getDraft: (postId) => get().drafts[postId] || null,

  removeDraft: (postId) =>
    set((state) => {
      const { [postId]: _, ...rest } = state.drafts;
      return { drafts: rest };
    }),

  clearAllDrafts: () => set({ drafts: {} }),
}));

// ============================================================================
// Post Selection Store (for multi-select operations)
// ============================================================================

interface PostSelectionState {
  selectedIds: Set<string>;
  isSelectMode: boolean;
}

interface PostSelectionActions {
  toggleSelectMode: () => void;
  setSelectMode: (mode: boolean) => void;
  toggleSelection: (postId: string) => void;
  selectAll: (postIds: string[]) => void;
  deselectAll: () => void;
  isSelected: (postId: string) => boolean;
  getSelectedCount: () => number;
}

export const usePostSelectionStore = create<PostSelectionState & PostSelectionActions>()(
  (set, get) => ({
    // Initial state
    selectedIds: new Set<string>(),
    isSelectMode: false,

    // Actions
    toggleSelectMode: () =>
      set((state) => ({
        isSelectMode: !state.isSelectMode,
        selectedIds: state.isSelectMode ? new Set() : state.selectedIds,
      })),

    setSelectMode: (mode) =>
      set({
        isSelectMode: mode,
        selectedIds: mode ? new Set() : new Set(),
      }),

    toggleSelection: (postId) =>
      set((state) => {
        const newSelected = new Set(state.selectedIds);
        if (newSelected.has(postId)) {
          newSelected.delete(postId);
        } else {
          newSelected.add(postId);
        }
        return { selectedIds: newSelected };
      }),

    selectAll: (postIds) => set({ selectedIds: new Set(postIds) }),

    deselectAll: () => set({ selectedIds: new Set() }),

    isSelected: (postId) => get().selectedIds.has(postId),

    getSelectedCount: () => get().selectedIds.size,
  }),
);
