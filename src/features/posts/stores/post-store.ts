import { create } from "zustand";

interface PostDraft {
  title: string;
  content: string;
  tags: string[];
  lastSaved?: Date;
}

interface PostDraftState {
  drafts: Record<string, PostDraft>;
  setDraft: (postId: string, draft: PostDraft) => void;
  getDraft: (postId: string) => PostDraft | undefined;
  clearDraft: (postId: string) => void;
  clearAllDrafts: () => void;
}

export const usePostDraftStore = create<PostDraftState>((set, get) => ({
  drafts: {},

  setDraft: (postId, draft) =>
    set((state) => ({
      drafts: {
        ...state.drafts,
        [postId]: { ...draft, lastSaved: new Date() },
      },
    })),

  getDraft: (postId) => get().drafts[postId],

  clearDraft: (postId) =>
    set((state) => {
      const { [postId]: _, ...rest } = state.drafts;
      return { drafts: rest };
    }),

  clearAllDrafts: () => set({ drafts: {} }),
}));

interface PostSelectionState {
  selectedIds: Set<string>;
  select: (id: string) => void;
  deselect: (id: string) => void;
  toggle: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  isSelected: (id: string) => boolean;
}

export const usePostSelectionStore = create<PostSelectionState>((set, get) => ({
  selectedIds: new Set<string>(),

  select: (id) =>
    set((state) => {
      const newSet = new Set(state.selectedIds);
      newSet.add(id);
      return { selectedIds: newSet };
    }),

  deselect: (id) =>
    set((state) => {
      const newSet = new Set(state.selectedIds);
      newSet.delete(id);
      return { selectedIds: newSet };
    }),

  toggle: (id) => {
    const { selectedIds } = get();
    if (selectedIds.has(id)) {
      get().deselect(id);
    } else {
      get().select(id);
    }
  },

  selectAll: (ids) => set({ selectedIds: new Set(ids) }),

  clearSelection: () => set({ selectedIds: new Set() }),

  isSelected: (id) => get().selectedIds.has(id),
}));
