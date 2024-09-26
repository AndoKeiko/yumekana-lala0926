import React from 'react';
import { useForm } from 'react-hook-form';
import { useForm as useInertiaForm } from '@inertiajs/react';
import Button from "@/Components/ui/Button";
import Input from "@/Components/ui/Input";
import Label from "@/Components/ui/Label";
import Textarea from "@/Components/ui/Textarea";
import Alert from "@/Components/ui/alert";

const GoalForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { data, setData, post, processing, errors: inertiaErrors } = useInertiaForm({
        name: '',
        current_status: '',
        description: '',
        period_start: '',
        period_end: '',
        status: 0,
        total_time: 0,
        progress_percentage: 0,
    });

    const onSubmit = (formData) => {
        post(route('goals.store'), {
            preserveState: true,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="my-5">
                <Label htmlFor="name" className="w-full block text-left">
                    目標名
                </Label>
                <Input
                    id="name"
                    className="my-2"
                    {...register("name", { required: "目標名は必須です" })}
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                />
                {errors.name && <p className="text-red-600 text-left">{errors.name.message}</p>}
                {inertiaErrors.name && <p className="text-red-600 text-left">{inertiaErrors.name}</p>}
            </div>

            <div className="my-5">
                <Label htmlFor="current_status" className="w-full block text-left">
                    現在の状況
                </Label>
                <Input
                    id="current_status"
                    className="my-2"
                    {...register("current_status", { required: "現在の状況は必須です" })}
                    value={data.current_status}
                    onChange={e => setData('current_status', e.target.value)}
                />
                {errors.current_status && <p className="text-red-600 text-left">{errors.current_status.message}</p>}
                {inertiaErrors.current_status && <p className="text-red-600 text-left">{inertiaErrors.current_status}</p>}
            </div>

            <div className="my-5">
                <Label htmlFor="description" className="w-full block text-left">
                    詳細
                </Label>
                <Textarea 
                    id="description" 
                    {...register("description")}
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                />
            </div>

            <div className="my-5">
                <Label htmlFor="period_start" className="w-full block text-left">
                    開始日
                </Label>
                <Input
                    id="period_start"
                    type="date"
                    className="my-2"
                    {...register("period_start", { required: "開始日は必須です" })}
                    value={data.period_start}
                    onChange={e => setData('period_start', e.target.value)}
                />
                {errors.period_start && <p className="text-red-600 text-left">{errors.period_start.message}</p>}
                {inertiaErrors.period_start && <p className="text-red-600 text-left">{inertiaErrors.period_start}</p>}
            </div>

            <div className="my-5">
                <Label htmlFor="period_end" className="w-full block text-left">
                    終了日
                </Label>
                <Input
                    id="period_end"
                    type="date"
                    className="my-2"
                    {...register("period_end", { required: "終了日は必須です" })}
                    value={data.period_end}
                    onChange={e => setData('period_end', e.target.value)}
                />
                {errors.period_end && <p className="text-red-600 text-left">{errors.period_end.message}</p>}
                {inertiaErrors.period_end && <p className="text-red-600 text-left">{inertiaErrors.period_end}</p>}
            </div>

            {Object.keys(inertiaErrors).length > 0 && (
                <Alert variant="destructive">
                    フォームにエラーがあります。修正してください。
                </Alert>
            )}

            <div className="my-5">
                <Button type="submit" className="button" disabled={processing}>
                    {processing ? "送信中..." : "目標を設定"}
                </Button>
            </div>
        </form>
    );
};

export default GoalForm;