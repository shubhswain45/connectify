import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateTrack } from "@/hooks/track";
import usePreviewFile from "@/hooks/usePrevFile";
import { Upload } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";

interface NewSong {
    title: string;
    artist: string;
    duration: string;
}

interface CreateTrackDialogProps {
    songDialogOpen: boolean;
    setSongDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTrackDialog = ({ songDialogOpen, setSongDialogOpen }: CreateTrackDialogProps) => {
    const { handleFileChange: handleImgChange, fileURL: imgUrl} = usePreviewFile("image");
    const { handleFileChange: handleAudioChange, fileURL: audioUrl} = usePreviewFile("audio");
    const { mutate: createTrack, isPending } = useCreateTrack();

    const audioInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const { register, handleSubmit, setValue } = useForm<NewSong>({
        defaultValues: {
            title: "",
            artist: "",
            duration: "0",
        },
    });

    const onSubmit = async (data: NewSong) => {
        createTrack({
            artist: data.artist,
            audioFileUrl: audioUrl || "",
            coverImageUrl: imgUrl || "",
            duration: data.duration,
            title: data.title,
        });
    };

    return (
        <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
            <DialogContent className="bg-gradient-to-b from-black to-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle className="text-white">Add New Song</DialogTitle>
                    <DialogDescription className="text-white">Add a new song to your music library</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
                    {/* File upload logic for image */}
                    <input
                        type="file"
                        accept="audio/*"
                        ref={audioInputRef}
                        hidden
                        onChange={(e) => {
                            handleAudioChange(e);
                            const file = e.target.files?.[0];
                            if (file) {
                                const audio = new Audio(URL.createObjectURL(file));
                                audio.onloadedmetadata = () => {
                                    setValue("duration", audio.duration.toFixed(1));
                                };
                            }
                        }}
                    />
                    <input
                        type="file"
                        ref={imageInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImgChange}
                    />

                    {/* Image Preview */}
                    <div
                        className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <div className="text-center">
                            {imgUrl ? (
                                <div className="space-y-2">
                                    <img
                                        src={imgUrl}
                                        alt="Selected artwork"
                                        className="max-h-40 object-contain rounded-md"
                                    />
                                    <div className="text-sm text-emerald-500">Image selected</div>
                                </div>
                            ) : (
                                <>
                                    <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                                        <Upload className="h-6 w-6 text-zinc-400" />
                                    </div>
                                    <div className="text-sm text-zinc-400 mb-2">Upload artwork</div>
                                    <Button variant="outline" size="sm" className="text-xs" type="button">
                                        Choose File
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Audio Preview */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Audio File</label>
                        <Button
                            variant="outline"
                            onClick={() => audioInputRef.current?.click()}
                            className="w-full"
                            type="button"
                        >
                            Choose Audio File
                        </Button>
                        {audioUrl && (
                            <audio
                                controls
                                src={audioUrl}
                                className="mt-2 w-full"
                            >
                                Your browser does not support the audio element.
                            </audio>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Title</label>
                        <Input
                            {...register("title")}
                            className="bg-zinc-800 border-zinc-700 text-white" // Added text-white here
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Artist</label>
                        <Input
                            {...register("artist")}
                            className="bg-zinc-800 border-zinc-700 text-white" // Added text-white here
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Duration (seconds)</label>
                        <Input
                            {...register("duration")}
                            type="number"
                            min="0"
                            readOnly
                            className="bg-zinc-800 border-zinc-700 text-white" // Added text-white here
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setSongDialogOpen(false)} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Uploading..." : "Add Song"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTrackDialog;